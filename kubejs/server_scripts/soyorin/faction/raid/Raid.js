/**
 * @class
 * @classdesc Raid class....
 * @param {number} id 
 * @param {$Faction[]} factions 
 * @param {Internal.ServerLevel} level 
 * @param {$RaidTarget} raidTarget 
 */
function $Raid(id, factions, level, raidTarget) {
    /**
     * @type {number} Raid实例唯一数字id
     */
    this.id = id;
    /**
     * @type {$Faction[]} 参与Raid的Factions
     */
    this.factions = factions;
    /**
     * @type {Internal.ServerLevel}
     */
    this.level = level;
    /**
     * @type {$RaidTarget}
     */
    this.raidTarget = raidTarget;
    /**
     * @type {Internal.ServerBossEvent}
     */
    this.raidEvent = new ServerBossEvent(Component.literal(""), "red", "notched_10");
    this.raidEvent.setName(this.getRaidEventName(raidTarget));
    this.raidEvent.setProgress(0.0);
    /**
     * @type {number} 总波次
     */
    this.numGroups = this.getNumGroups(level.getDifficulty(), raidTarget);
    /**
     * @type {BlockPos[]} 波次生成位置
     */
    this.waveSpawnPos = [];
    /**
     * @type {Map<number, Internal.Mob}
     */
    this.groupToLeaderMap = new Map();
    /**
     * @type {Map<number, Set<Internal.Mob>}
     */
    this.groupRaiderMap = new Map();
    /**
     * @type {Set<Internal.UUID>}
     */
    this.heroesOfTheVillage = new Set();
    /**
     * @type {number} Raid's Level
     */
    this.badOmenLevel;
    /**
     * @type {number} 
     */
    this.totalHealth;
    /**
     * @type {number}
     */
    this.groupsSpawned = raidTarget.getStartingWave();
    /**
     * @type {boolean}
     */
    this.started;
    /**
     * @type {boolean}
     */
    this.active = true;
    /**
     * @type {$RaidStatus}
     */
    this.status = $RaidStatus.ONGOING;
    /**
     * @type {number}
     */
    this.ticksActive;
    /**
     * @type {number}
     */
    this.raidCooldownTicks;
    /**
     * @type {number}
     */
    this.postRaidTicks;
    /**
     * @type {number}
     */
    this.celebrationTicks;
}

$Raid.prototype.getLevel = function () {
    return this.level;
}

$Raid.prototype.getRaidTarget = function () {
    return this.raidTarget;
}

$Raid.prototype.getId = function () {
    return this.id;
}

$Raid.prototype.getCenter = function () {
    return this.raidTarget.getTargetBlockPos();
}

$Raid.prototype.getFactions = function () {
    return this.factions;
}

/**
 * @description 这里要走Config
 * @param {Internal.Difficulty_} difficulty 
 * @param {$RaidTarget} raidTarget 
 */
$Raid.prototype.getNumGroups = function (difficulty, raidTarget) {
    /**@type {number} */
    let numberOfWaves = 0;
    switch (difficulty) {
        case "easy":
            numberOfWaves = 1;
            break;
        case "normal":
            numberOfWaves = 2;
            break;
        case "hard":
            numberOfWaves = 3;
            break;
        default:
            numberOfWaves = 0;
    }
    numberOfWaves += raidTarget.getAdditionalWaves();
    return Math.min(numberOfWaves, 10);
}

/**
 * 
 * @param {$Faction} faction 
 */
$Raid.prototype.addFaction = function (faction) {
    this.factions.push(faction);
}

/**
 * 
 * @param {$Faction[]} factions
 */
$Raid.prototype.addFactions = function (factions) {
    this.factions.concat(factions)
}

$Raid.prototype.tick = function () {
    if (!this.isStopped()) {

        /**
         * debug
         */
        console.log("Raid is ticking...");
        console.log(`this status: ${this.status == $RaidStatus.ONGOING}`);

        if (this.factions.length = 0) {

            /**
             * debug
             */
            console.log("Raid is stop, factions.length = 0");

            this.stop();
        }
        if (this.status == $RaidStatus.ONGOING) {

            /**
             * debug
             */
            console.log("Raid status is ONGOING!")

            let flag = this.active; // 标记 active 执行中标记
            this.active = this.level.hasChunkAt(this.raidTarget.getTargetBlockPos()); // 区块是否被加载
            if (this.level.getDifficulty() == Difficulty.PEACEFUL) { // 和平难度停止执行
                this.stop();
                return;
            }
            if (flag != this.active) { // 区块加载和执行中两者任一不满足退出

                /**
                 * debug
                 */
                console.log("Raid is stoped, flag != this.active")

                return;
            }

            this.raidTarget.updateTargetBlockPos(this.level); // 更新目标位置

            /**
             * 失败
             */
            if (this.raidTarget.isDefeat(this, this.level)) {
                if (this.groupsSpawned > 0) {
                    this.status = $RaidStatus.LOSS;
                    this.playSound(this.raidTarget.getTargetBlockPos(), this.factions[0].getRaidConfig().getDefeatSoundEvent());
                    this.raidEvent.setName(this.getRaidEventNameDefeat(this.raidTarget));
                } else {
                    this.stop();
                }
            }

            this.ticksActive++;
            if (this.ticksActive >= 48000) {
                this.stop();

                /**
                 * debug
                 */
                console.log("raid ticks active is >= 48000, stop.");

                return;
            }

            let i = this.getTotalRaidersAlive();
            if (i == 0 && this.hasMoreWaves()) {
                if (this.raidCooldownTick()) {

                    /**
                     * debug
                     */
                    console.log("raid cooldown tick...");

                    return;
                }
            }

            /**
             * 更新数据
             */
            if (this.ticksActive % 20 == 0) {
                this.updatePlayers();
                this.updateRaiders();
                if (i > 0) {
                    if (i <= 2) {
                        this.raidEvent.setName(this.getRaidEventName(this.raidTarget).copy().append(" - ").append(Component.translatable("event.minecraft.raid.raiders_remaining", i)));
                    } else {
                        this.raidEvent.setName(this.getRaidEventName(this.raidTarget));
                    }
                } else {
                    this.raidEvent.setName(this.getRaidEventName(this.raidTarget));
                }
            }

            let flag3 = false;
            let k = 0;

            while (this.shouldSpawnGroup()) {
                console.log("<while>");
                for (let j = this.waveSpawnPos.length; j < this.factions.length; j++) {
                    let randomSpawnPos = this.findRandomSpawnPos(k, 20);
                    if (randomSpawnPos) {
                        this.waveSpawnPos.push(randomSpawnPos);
                    }
                }
                if (this.waveSpawnPos.length >= this.factions.length) { // 波次生成位置数量大于等于阵营数量 开始生成
                    this.started = true;
                    this.spawnGroup();
                    if (!flag3) {
                        // 这里曾Post Event
                        flag3 = true;
                    }
                } else { // 否则继续尝试
                    k++;
                }

                if (k > 3) { // 尝试此处抵达上限 停止
                    this.stop();
                    break;
                }
            }

            if (this.isStarted() && !this.hasMoreWaves() && i == 0) {
                if (this.postRaidTicks < 40) {
                    this.postRaidTicks++;
                } else {
                    this.status = $RaidStatus.VICTORY;
                    // Post Event 此处曾经
                    this.playSound(this.raidTarget.getTargetBlockPos(), this.factions[0].getRaidConfig().getVictorySoundEvent());
                    this.raidEvent.setName(this.getRaidEventNameVictory(this.raidTarget));

                    for (let uuid of this.heroesOfTheVillage) {
                        /**@type {Internal.LivingEntity} */
                        let entity = this.level.getEntity(uuid);
                        if (entity instanceof LivingEntity && !entity.isSpectator()) {
                            entity.addEffect(new MobEffectInstance("minecraft:hero_of_the_village", 48000, this.badOmenLevel - 1, false, false, true));
                            if (entity instanceof ServerPlayer) {
                                /**@type {Internal.ServerPlayer} */
                                let serverPlayer = entity;
                                serverPlayer.awardStat(Stats.RAID_WIN);
                                // CriteriaTriggers.RAID_WIN.trigger(serverplayerentity);
                            }
                        }
                    }
                }
            }
        } else if (this.isOver()) {
            this.celebrationTicks++;
            if (this.celebrationTicks >= 600) {
                this.stop();
                return;
            }

            if (this.celebrationTicks % 20 == 0) {
                this.updatePlayers();
                this.raidEvent.setVisible(true);
                if (this.isVictory()) {
                    this.raidEvent.setProgress(0.0);
                    this.raidEvent.setName(this.getRaidEventNameVictory(this.raidTarget));
                } else {
                    this.raidEvent.setName(this.getRaidEventNameDefeat(this.raidTarget));
                }
            }
        }


    }
}

/**
 * 
 * @param {blockpos} blockpos 
 * @param {Internal.SoundEvent | undefined} soundEvent 
 */
$Raid.prototype.playSound = function (blockpos, soundEvent) {
    if (!soundEvent) return;
    let f = 13.0;
    let i = 64;
    let players = this.raidEvent.getPlayers();

    for (const player of this.level.getPlayers()) {
        let vec3d = player.position();
        let vec3d1 = Vec3d.atCenterOf(blockpos);
        let f1 = Math.sqrt((vec3d1.x() - vec3d.x) * (vec3d1.x() - vec3d.x) + (vec3d1.z() - vec3d.z) * (vec3d1.z() - vec3d.z));
        let d0 = vec3d.x + (13.0 / f1) * (vec3d1.x() - vec3d.x);
        let d1 = vec3d.z + (13.0 / f1) * (vec3d1.z() - vec3d.z);
        if (f1 <= 64 || players.contains(player)) {
            player.connection.send(new ClientboundSoundPacket(soundEvent, SoundSource.NEUTRAL, d0, player.getY(), d1, 64.0, 1.0, player.getRandom().nextLong()))
        }
    }
}
/**
 * 
 * @returns {boolean}
 */
$Raid.prototype.raidCooldownTick = function () {
    if (this.raidCooldownTicks <= 0) {
        if (this.raidCooldownTicks == 0 && this.groupsSpawned > 0) {
            this.raidCooldownTicks = 300;
            this.raidEvent.setName(this.getRaidEventName(this.raidTarget));
            return true;
        }
    } else {
        let flag1 = this.waveSpawnPos.length >= this.factions.length;
        let flag2 = !flag1 && this.raidCooldownTicks % 5 == 0;
        if (flag1 && !this.level.isPositionEntityTicking(this.waveSpawnPos[0])) {
            this.waveSpawnPos.shift();
            flag2 = true;
        }

        if (flag2) {
            let j = 0;
            if (this.raidCooldownTicks < 100) {
                j = 1;
            } else if (this.raidCooldownTicks < 40) {
                j = 2;
            }

            let validSpawnPos = this.getValidSpawnPos(j);
            if (validSpawnPos) {
                this.waveSpawnPos.push(validSpawnPos);
            }
        }

        if (this.raidCooldownTicks == 300 || this.raidCooldownTicks % 20 == 0) {
            this.updatePlayers();
        }

        --this.raidCooldownTicks;
        /**
         * @description 钳制
         * @param {number} value 
         * @param {number} min 
         * @param {number} max 
         * @returns {number}
         */
        let clamp = (value, min, max) => { return Math.max(min, Math.min(max, value)) }
        this.raidEvent.setProgress(clamp((300 - this.raidCooldownTicks) / 300, 0.0, 1.0));
    }
    return false;
}

/**
 * @description 应该生成？
 * @returns {boolean}
 */
$Raid.prototype.shouldSpawnGroup = function () {
    // 冷却时间清空 && 已生成数量小于总数量 && 袭击者总存活数为0
    return this.raidCooldownTicks == 0 && (this.groupsSpawned < this.numGroups) && this.getTotalRaidersAlive() == 0;
}

$Raid.prototype.spawnGroup = function () {
    let waveNumber = this.groupsSpawned + 1;
    this.totalHealth = 0.0;

    let waveMultiplier = 0.65 + (this.groupsSpawned * 0.15);
    let spreadMultiplier = ((this.level.random.nextFloat() * 2) - 1) * 0.1;
    let difficultyMultiplier = this.getDifficultyMultiplier(level.getDifficulty());
    let badOmenMultiplier = 0.1 * (this.factions.length - 1);
    let totalMultiplier = waveMultiplier + spreadMultiplier + difficultyMultiplier + badOmenMultiplier;
    let targetStrength = Math.floor(this.raidTarget.getTargetStrength() * totalMultiplier);
    /**@type {Map<$Faction, number>} */
    let factionFractions = this.determineFactionFractions(targetStrength);
    factionFractions.forEach((value, faction) => this.spawnGroupForFaction(this.waveSpawnPos.shift(), waveNumber, value, faction));

    this.waveSpawnPos.length = 0;
    this.groupsSpawned++;
    this.updateBossbar();
}

/**
 * 
 * @param {number} targetStrength 
 */
$Raid.prototype.determineFactionFractions = function (targetStrength) {
    /**@type {Map<$Faction, number>} */
    let factionFractions = new Map();
    let perFactionStrength = Math.floor(targetStrength / this.factions.length);
    this.factions.forEach(faction => {
        if (factionFractions.has(faction)) {
            factionFractions.set(faction, factionFractions.get(faction) + perFactionStrength)
        } else {
            factionFractions.set(faction, perFactionStrength);
        }
    })
    return factionFractions;
}

/**
 * 
 * @param {BlockPos} spawnBLockPos 
 * @param {number} waveNumber 
 * @param {number} targetStrength 
 * @param {$Faction} faction 
 */
$Raid.prototype.spawnGroupForFaction = function (spawnBLockPos, waveNumber, targetStrength, faction) {
    let factionGroupSpawner = new $FactionGroupSpawner(level, spawnBLockPos, waveNumber, targetStrength, faction.getRaidConfig().getMobsFraction(), faction);
    factionGroupSpawner.spawnGroup();
    factionGroupSpawner.getEntities().forEach(mobEntity => {
        let factionEntity = $FactionEntityHelper.getFactionEntity(mobEntity);
        if (factionEntity.getFaction() && factionEntity.getFactionEntityType()) {
            this.joinRaid(waveNumber, mobEntity);
        }
    });
    this.playSound(spawnBLockPos, this.factions[0].getRaidConfig().getWaveSoundEvent());
}

/**
 * 
 * @param {Internal.Difficulty_} difficulty 
 */
$Raid.prototype.getDifficultyMultiplier = function (difficulty) {
    switch (difficulty) {
        case "easy":
            return $FactionConfig.TARGET_STRENGTH_DIFFICULTY_MULTIPLIER_EASY;
        case "normal":
            return $FactionConfig.TARGET_STRENGTH_DIFFICULTY_MULTIPLIER_NORMAL;
        case "hard":
            return $FactionConfig.TARGET_STRENGTH_DIFFICULTY_MULTIPLIER_HARD;
        default:
            return 0;
    }
}

/**
 * 
 * @param {number} raidId 
 * @param {Internal.Mob} mobEntity 
 */
$Raid.prototype.setLeader = function (raidId, mobEntity) {
    this.groupToLeaderMap.set(raidId, mobEntity);
}

/**
 * 
 * @param {number} wave 
 */
$Raid.prototype.removeLeader = function (wave) {
    this.groupToLeaderMap.delete(wave);
}

/**
 * 
 * @param {number} wave 
 * @param {Internal.Mob} mobEntity 
 */
$Raid.prototype.joinRaid = function (wave, mobEntity) {
    this.addWaveMob(wave, mobEntity, true);
    $RaiderHelper.getRaider(mobEntity).addToRaid(wave, this);
}

/**
 * 
 * @param {number} wave 
 * @param {Internal.Mob} mobEntity 
 * @param {boolean} fresh 
 */
$Raid.prototype.addWaveMob = function (wave, mobEntity, fresh) {
    if (!this.groupRaiderMap.has(wave)) {
        this.groupRaiderMap.set(wave, new Set());
    }

    /**@type {Set<Internal.Mob>} */
    let set = this.groupRaiderMap.get(wave);
    /**@type {Internal.Mob} */
    let raider0;
    for (const raider1 of set) {
        if (raider1.getUuid().equals(mobEntity.getUuid())) {
            raider0 = raider1;
            break;
        }
    }

    if (raider0) {
        set.delete(raider0);
    }

    set.add(mobEntity);
    if (fresh) {
        this.totalHealth += mobEntity.getHealth();
    }

    this.updateBossbar();

}

/**
 * 
 * @param {Internal.Mob} mobEntity 
 * @param {number} wave 
 * @param {boolean} fresh 
 */
$Raid.prototype.removeFromRaid = function (mobEntity, wave, fresh) {
    let set = this.groupRaiderMap.get(wave);
    if (set) {
        let flag = set.delete(mobEntity);
        if (flag) {
            if (fresh) {
                this.totalHealth -= mobEntity.getHealth();
            }

            $RaiderHelper.getRaider(mobEntity).setRaid(undefined);
            this.updateBossbar()
        }
    }
}

$Raid.prototype.updateRaiders = function () {
    let iterator = this.groupRaiderMap.entries();
    for (const [wave, setMobEntities] of this.groupRaiderMap) {
        /**@type {Set<Internal.Mob>} */
        let set = new Set();

        /**@type {Internal.Mob} */
        let mobEntity;
        for (mobEntity of setMobEntities) {
            let blockPos = mobEntity.blockPosition();
            if (mobEntity.isAlive() && mobEntity.level.dimension.equals(this.level.dimension) && !(this.getCenter().distSqr(blockPos) >= 12544.0)) {
                if (mobEntity.tickCount > 600) {
                    let raider = $RaiderHelper.getRaider(mobEntity);
                    if (!this.level.getEntity(mobEntity.getUuid())) {
                        set.add(mobEntity);
                    }

                    if (mobEntity.getNoActionTime() > 2400) {
                        raider.setTicksOutsideRaid(raider.getTicksOutsideRaid() + 1)
                    }

                    if (raider.getTicksOutsideRaid() >= 30) {
                        set.add(mobEntity);
                    }
                }
            } else {
                set.add(mobEntity)
            }
        }
        for (let raider1 of set) {
            this.removeFromRaid(raider1, wave, true);
        }
    }
}

$Raid.prototype.updateBossbar = function () {
    /**@param {number} value @param {number} min @param {number} max  */
    let clamp = (value, min, max) => { return Math.min(max, Math.max(min, value)); }

    this.raidEvent.setProgress(clamp(this.getHealthOfLivingRaiders() / this.totalHealth, 0.0, 1.0));
}

$Raid.prototype.getHealthOfLivingRaiders = function () {
    let healthOfRaiders = 0.0;

    for (const [wave, setMobEntities] of this.groupRaiderMap) {
        for (const mobEntity of setMobEntities) {
            healthOfRaiders += mobEntity.getHealth();
        }
    }

    return healthOfRaiders;
}

/**
 * 
 * @param {number} attempts 
 */
$Raid.prototype.getValidSpawnPos = function (attempts) {
    let blockPos;
    for (let index = 0; index < 3; index++) {
        blockPos = this.findRandomSpawnPos(attempts, 1);
        if (blockPos) {
            break;
        }
    }
    return blockPos;
}

/**
 * 
 * @param {number} outerAttempt 
 * @param {number} maxInnerAttempts 
 * @returns {Internal.MutableBlockPos | undefined}
 */
$Raid.prototype.findRandomSpawnPos = function (outerAttempt, maxInnerAttempts) {
    let i = 2 - outerAttempt;
    let blockpos$mutable = new MutableBlockPos();

    for (let i1 = 0; i1 < maxInnerAttempts; i1++) {
        
        let f = this.level.random.nextFloat() * 3.1415926 * 2.0;
        let j = this.raidTarget.getTargetBlockPos().getX() + Math.floor(Math.cos(f) * this.raidTarget.getSpawnDistance() * i + this.level.random.nextInt(5));
        let l = this.raidTarget.getTargetBlockPos().getZ() + Math.floor(Math.cos(f) * this.raidTarget.getSpawnDistance() * i + this.level.random.nextInt(5));

        /**
         * debug
         */
        console.log(`| f: ${f} | j: ${j} | l: ${l}`);

        let k = this.level.getHeight("world_surface", j, l);
        blockpos$mutable.set(j, k, l);
        if (this.isValidSpawnPos(blockpos$mutable) && this.raidTarget.isValidSpawnPos(outerAttempt, blockpos$mutable, this.level)) {
            return blockpos$mutable;
        }
    }
    return undefined;
}

/**
 * 
 * @param {Internal.BlockPos$MutableBlockPos} blockpos$mutable 
 */
$Raid.prototype.isValidSpawnPos = function (blockpos$mutable) {
    return this.waveSpawnPos.map(existingWaveSpawnPos => blockpos$mutable.distSqr(existingWaveSpawnPos) > 40).reduce((previousValue, currentValue) => { return previousValue && currentValue }, true);
}

/**
 * 
 * @param {Internal.Difficulty_} difficulty 
 * @param {$RaidTarget} raidTarget 
 */
$Raid.prototype.getNumGroups = function (difficulty, raidTarget) {
    let numberOfWaves = 0;
    switch (difficulty) {
        case "easy":
            numberOfWaves = $FactionConfig.NUMBER_WAVES_EASY;
            break;
        case "normal":
            numberOfWaves = $FactionConfig.NUMBER_WAVES_NORMAL;
            break;
        case "hard":
            numberOfWaves = $FactionConfig.NUMBER_WAVES_HARD;
            break;
        default:
            numberOfWaves = 0;

    }
}

/**
 * @returns {boolean}
 */
$Raid.prototype.hasMoreWaves = function () {
    return !this.isFinalWave();
}
/**
 * 
 * @returns {boolean}
 */
$Raid.prototype.isFinalWave = function () {
    return this.getGroupsSpawned() >= this.numGroups;
}

$Raid.prototype.getGroupsSpawned = function () {
    return this.groupsSpawned;
}

/**
 * 
 * @returns {boolean}
 */
$Raid.prototype.validPlayer = function () {
    return (/**@type {Internal.ServerPlayer} */serverPlayer) => {
        let blockPos = serverPlayer.blockPosition();
        let raidManager = $RaidManagerHelper.getRaidManager(serverPlayer.level);
        return serverPlayer.isAlive() && raidManager.getRaidAt(blockPos) == this;
    }
}

$Raid.prototype.updatePlayers = function () {
    let setPlayers = new Set(this.raidEvent.getPlayers());
    let listPlayers = this.level.getPlayers(this.validPlayer());

    for (const player of listPlayers) {
        if (!setPlayers.has(player)) {
            this.raidEvent.addPlayer(player);
        }
    }

    for (const player of setPlayers) {
        if (!listPlayers.contains(player)) {
            this.raidEvent.removePlayer(player);
        }
    }
}

/**
 * 
 * @returns {number}
 */
$Raid.prototype.getTotalRaidersAlive = function () {
    return Array.from(this.groupRaiderMap.values()).map((setMobEntity) => setMobEntity.size()).reduce((previousValue, currentValue) => previousValue + currentValue, 0);
}

/**
 * @param {number} wave
 */
$Raid.prototype.getRaidersInWave = function (wave) {
    return this.groupRaiderMap.get(wave);
}

$Raid.prototype.stop = function () {
    this.active = false;
    this.raidEvent.removeAllPlayers();
    let raidersInWave = this.getRaidersInWave(this.getGroupsSpawned());
    if (raidersInWave && !this.isLoss()) {
        raidersInWave.forEach(entity => entity.kill());
    }
    this.status = $RaidStatus.STOPPED;
}

/**
 * 
 * @param {Internal.ServerPlayer} player 
 */
$Raid.prototype.addHeroOfTheVillage = function (player) {
    this.heroesOfTheVillage.add(player.getUuid());
}

$Raid.prototype.isBetweenWaves = function () {
    return this.hasFirstWaveSpawned() && this.getTotalRaidersAlive() == 0 && this.raidCooldownTicks > 0;
}

$Raid.prototype.hasFirstWaveSpawned = function () {
    return this.groupsSpawned > 0;
}

$Raid.prototype.isStarted = function () {
    return this.started;
}

$Raid.prototype.isActive = function () {
    return this.active;
}

$Raid.prototype.isStopped = function () {
    return this.status == $RaidStatus.STOPPED;
}

$Raid.prototype.isVictory = function () {
    return this.status == $RaidStatus.VICTORY;
}

$Raid.prototype.isLoss = function () {
    return this.status == $RaidStatus.LOSS;
}

$Raid.prototype.isOver = function () {
    return this.isVictory() || this.isLoss();
}

/**
 * 
 * @param {$RaidTarget} raidTarget 
 */
$Raid.prototype.getRaidEventName = function (raidTarget) {
    return raidTarget.getRaidType() == $RaidTargetType.BATTLE ? Component.translatable("event.faction.battle") : this.factions[0].getRaidConfig().getRaidBarNameComponent();
}

/**
 * 
 * @param {$RaidTarget} raidTarget 
 */
$Raid.prototype.getRaidEventNameDefeat = function (raidTarget) {
    return raidTarget.getRaidType() == $RaidTargetType.BATTLE ? Component.translatable("event.faction.battle.over") : this.factions[0].getRaidConfig().getRaidBarDefeatComponent();
}

/**
 * 
 * @param {$RaidTargetType} raidTarget 
 */
$Raid.prototype.getRaidEventNameVictory = function (raidTarget) {
    return raidTarget.getRaidType() == $RaidTargetType.BATTLE ? Component.translatable("event.faction.battle.over") : this.factions[0].getRaidConfig().getRaidBarVictoryComponent();
}

$Raid.prototype.endWave = function () {
    let raidersInWave = this.getRaidersInWave(this.getGroupsSpawned());
    if (raidersInWave) {
        raidersInWave.forEach(mobEntity => mobEntity.kill());
    }
}

/**
 * 
 * @param {$Faction} faction 
 * @param {BlockPos} spawnBlocksPos 
 * @param {Internal.Mob | undefined} mob 
 */
$Raid.prototype.spawnDigger = function (faction, spawnBlocksPos, mob) {
    if (this.getDiggersInWave() > Math.ceil(this.getRaidersInWave(this.getGroupsSpawned()).size * 0.10)) return;
    let entityWeightMapProperties = new $EntityWeightMapProperties().setAllowedRanks([$FactionEntityRank.DIGGER]).setBlockPos(spawnBlocksPos);
    let weightMap = faction.getWeightMap(entityWeightMapProperties);

    if (!weightMap) return;
    /**@type {$FactionEntityType} */
    let randomEntry = GeneralUtils.getRandomEntry(weightMap, this.level.random);
    let entity = randomEntry.createEntity(this.level, faction, spawnBlocksPos, false, $FactionEntityRank.DIGGER, MobSpawnType.PATROL);

    if (entity instanceof Mob) {
        this.joinRaid(this.getGroupsSpawned(), mob);
    }

}

$Raid.prototype.getDiggersInWave = function () {
    return Array.from(this.getRaidersInWave(this.getGroupsSpawned())).filter(
        entity => $FactionEntityHelper.getFactionEntity(entity).hasRank($FactionEntityRank.DIGGER)).length;
}

/**
 * 
 * @param {Internal.CompoundTag} nbt 
 * @returns {Internal.CompoundTag}
 */
$Raid.prototype.save = function (nbt) {
    nbt.putInt("Id", this.id);
    nbt.putBoolean("Started", this.started);
    nbt.putBoolean("Active", this.active);
    nbt.putLong("TicksActive", this.ticksActive);
    nbt.putInt("BadOmenLevel", this.badOmenLevel);
    nbt.putInt("PreRaidTicks", this.raidCooldownTicks);
    nbt.putInt("PostRaidTicks", this.postRaidTicks);
    nbt.putFloat("TotalHealth", this.totalHealth);
    nbt.putInt("NumGroups", this.numGroups);
    nbt.putString("Status", this.status.getName());

    let factionListTag = new ListTag();
    for (let faction of this.factions) {
        let compoundTag = new CompoundTag();
        compoundTag.putString("Faction", String(faction.getName()));
        factionListTag.add(compoundTag);
    }
    nbt.put("Factions", factionListTag);

    let raidTargetNBT = new CompoundTag();
    this.raidTarget.save(raidTargetNBT);
    nbt.put("RaidTarget", raidTargetNBT);

    let listNBT = new ListTag();

    for (const uuid of this.heroesOfTheVillage) {
        listNBT.add(NbtUtils.createUUID(uuid));
    }
    nbt.put("HeroesOfTheVillage", listNBT);
    return nbt;
}

/**
 * 
 * @param {Internal.ServerLevel} level 
 * @param {Internal.CompoundTag} nbt 
 */
$Raid.of = function (level, nbt) {
    /**@type {Internal.ServerLevel} */
    // let level = level;
    /**@type {$Faction[]} */
    let factions = [];
    /**@type {$RaidTarget} */
    let raidTarget;
    // let raidEvent;
    let id = nbt.getInt("Id");
    let started = nbt.getBoolean("Started");
    let active = nbt.getBoolean("Active");
    let ticksActive = nbt.getLong("TicksActive");
    let badOmenLevel = nbt.getInt("BadOmenLevel");
    let groupsSpawned = nbt.getInt("GroupsSpawned");
    let raidCooldownTicks = nbt.getInt("PreRaidTicks");
    let postRaidTicks = nbt.getInt("PostRaidTicks");
    let totalHealth = nbt.getFloat("TotalHealth");
    let numGroups = nbt.getInt("NumGroups");
    let status = $RaidStatus.byName(nbt.getString("Status"));
    let heroesOfTheVillage = [];

    if (nbt.contains("HeroesOfTheVillage", 9)) {
        let listNBT = nbt.getList("HeroexOfTheVillage", 11);
        for (let index = 0; index < listNBT.size(); index++) {
            heroesOfTheVillage.push(NbtUtils.loadUUID(listNBT.get(index)));
        }
    }

    let factionListNBT = nbt.getList("Factions", 10);


    for (let index = 0; index < factionListNBT.size(); index++) {
        let compoundNBT = factionListNBT.getCompound(index);
        let factionName = new ResourceLocation(compoundNBT.getString("Faction"));
        if ($FactionRegistry.factionExists(factionName)) {
            let faction = $FactionRegistry.getFaction(factionName);
            factions.push(faction);
        }
    }
    raidTarget = $RaidTargetHelper.load(level, nbt.getCompound("RaidTarget"));

    let raid = new $Raid(id, factions, level, raidTarget);
    raid.started = started;
    raid.active = active;
    raid.ticksActive = ticksActive;
    raid.badOmenLevel = badOmenLevel;
    raid.groupsSpawned = groupsSpawned;
    raid.raidCooldownTicks = raidCooldownTicks;
    raid.postRaidTicks = postRaidTicks;
    raid.totalHealth = totalHealth;
    raid.numGroups = numGroups;
    raid.status = status;
    return raid;

}