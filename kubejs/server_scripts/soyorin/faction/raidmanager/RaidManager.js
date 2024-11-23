/**
 * @class
 * @classdesc
 * @param {Internal.ServerLevel} level 
 */
function $RaidManager (level) {
    /**
     * @type {Map<number, $Raid>}
     */
    this.raidMap = new Map();
    /**
     * @type {Internal.ServerLevel}
     */
    this.level = level;
    this.nextAvailavleID = 1;
    /**
     * @type {number}
     */
    this.tickCount;

    // console.log("新建RaidManager实例");
    this.deserializeNBT(this.level.getPersistentData()); // 从现有数据创建...
    $RaidManager.VALUES.set(String(this.level.dimension), this);
}

$RaidManager.prototype.tick = function () {
    /**
     * debug
     */
    if (this.tickCount % 20 == 0 && this.level.dimension == "minecraft:overworld") {
        // console.log(`RaidManager Ticking... ${this.tickCount} ${Array.from($RaidManager.VALUES).length}`);
        
        this.level.server.getPlayers().forEach(player => player.tell(`RaidMangaer Ticking: ${this.tickCount} | raid size: ${this.raidMap.size}`));
    }


    this.tickCount++;
    let iterator = this.raidMap.values();
    let result = iterator.next();

    while (!result.done) {
        /**@type {$Raid} */
        let raid = result.value;
        if (this.level.getGameRules().getBoolean(GameRules.RULE_DISABLE_RAIDS)) {
            raid.stop();
        }

        if (raid.isStopped()) {
            this.level.server.tell("Raid is Stopped!")
            this.raidMap.delete(raid.getId());
            // this.raidMap.forEach((raidInstance, id, map) => {
            //     if (raidInstance == raid) {
            //         map.delete(id);
            //     }
            // })
        } else {
            raid.tick();
        }
        result = iterator.next();
    }

    // /**
    //  * Save
    //  */
    // let data = this.level.getPersistentData();
    // let nbt = this.serializeNBT();
    // data.merge(nbt);
}

/**
 * 
 * @param {Internal.Mob} raider 
 * @param {$Raid} raid 
 */
$RaidManager.prototype.canJoinRaid = function (raider, raid) {
    if (raider && raid && raid.getLevel()) {
        return raider.isAlive() && raider.getNoActionTime() <= 2400 && raider.level.dimensionType() == raid.getLevel().dimensionType();
    } else {
        return false;
    }
}

$RaidManager.prototype.getRaids = function () {
    return this.raidMap;
}

$RaidManager.prototype.getUniqueId = function () {
    return ++this.nextAvailavleID;
}

/**
 * @type {BlockPos}
 */
$RaidManager.prototype.getRaidAt = function (blockPos) {
    return this.getNearbyRaid(blockPos, 9216);
}

/**
 * 
 * @param {BlockPos} blockPos 
 * @param {number} distance 
 */
$RaidManager.prototype.getNearbyRaid = function (blockPos, distance) {
    /**@type {$Raid} */
    let raid;
    let d0 = distance;

    for (const raid1 of this.raidMap.values()) {
        let d1 = raid1.getCenter().distSqr(blockPos);
        if (raid1.isActive() && d1 < d0) {
            raid = raid1;
            d0 = d1;
            break;
        }
    }
    return raid;
}

/**
 * @description 创建袭击
 * @param {$Faction[]} factions
 * @param {$RaidTarget} raidTarget 
 */
$RaidManager.prototype.createRaid = function (factions, raidTarget) {
    if ($FactionConfig.DISABLE_FACTION_RAIDS) {
        return;
    } else {
        /**@type {$Raid} */
        let raid = this.getRaidAt(raidTarget.getTargetBlockPos());
        if (!raid) {
            raid = new $Raid(this.getUniqueId(), factions, this.level, raidTarget);
            if (!this.raidMap.has(raid.getId())) {
                this.raidMap.set(raid.getId(), raid);
            }
        }
        return raid;
    }
}

/**
 * 
 * @param {$RaidTarget} raidTarget 
 * @param {Internal.ServerPlayer} player 
 */
$RaidManager.prototype.createBadOmenRaid = function (raidTarget, player) {
    if ($FactionConfig().DISABLE_FACTION_RAIDS) {
        return;
    } else {
        /**@type {$Raid} */
        let raid = this.getRaidAt(raidTarget.getTargetBlockPos());
        let factionInteraction = $FactionInteractionHelper.getFactionInteraction(player);
        let badOmenFactions = factionInteraction.getBadOmenFactions();

        if (!raid) {
            raid = this.createRaid(badOmenFactions, raidTarget);
            this.clearBadOmen(factionInteraction, player, raid, true);
        } else if (raid.getFactions().length <= $FactionConfig.RAID_MAX_FACTIONS) {
            if (raid.getFactions().length + badOmenFactions.length <= $FactionConfig.RAID_MAX_FACTIONS) {
                raid.addFactions(badOmenFactions);
            } else {
                for (let badOmenFaction of badOmenFactions) {
                    if (raid.getFactions().length < $FactionConfig.RAID_MAX_FACTIONS) {
                        raid.addFaction(badOmenFaction)
                    }
                }
            }
            this.clearBadOmen(factionInteraction, player, raid, true);
        } else {
            this.clearBadOmen(factionInteraction, player, raid, true);
        }
        return raid;
    }
}

/**
 * 
 * @param {$FactionInteraction} factionInteraction 
 * @param {Internal.ServerPlayer} player 
 * @param {$Raid} raid 
 * @param {boolean} contributed 
 */
$RaidManager.prototype.clearBadOmen = function (factionInteraction, player, raid, contributed) {
    factionInteraction.clearBadOmenFactions();
    // player.removeEffect(arg0)
    player.connection.send(new ClientboundSoundPacket(player, 43));
    if (contributed && !raid.hasFirstWaveSpawned()) {
        // player.awardStat(Stats.RAID_TRIGGER);

    }
}

$RaidManager.prototype.serializeNBT = function () {
    let nbt = new CompoundTag();
    nbt.putInt("NextAvailableID", this.nextAvailavleID);
    nbt.putInt("Tick", this.tickCount);
    let listNBT = new ListTag();

    for (let raid of this.raidMap.values()) {
        let compoundNBT = new CompoundTag();
        raid.save(compoundNBT);
        console.log(`${compoundNBT.toString()}`)
        listNBT.add(compoundNBT);
    }

    nbt.put("Raids", listNBT);
    console.log(`${nbt.toString()}`);
    return nbt;
}

/**
 * 
 * @param {Internal.CompoundTag} nbt 
 */
$RaidManager.prototype.deserializeNBT = function (nbt) {
    
    this.nextAvailavleID = nbt.getInt("NextAvailableID");
    this.tickCount = nbt.getInt("Tick");
    let listNBT = nbt.getList("Raids", 10);
    console.log(`反序列化RaidManager中 | listNBT size: ${listNBT.size()}`);
    for (let index = 0; index < listNBT.size(); index++) {
        listNBT.getCompound(i);

        let raid = $Raid.of(this.level, nbt);
        console.log(`反序列化Raid中 ${raid instanceof $Raid}`);
        this.raidMap.set(raid.getId(), raid);

    }
}

/**
 * @type {Map<string, $RaidManager>}
 */
$RaidManager.VALUES = new Map();