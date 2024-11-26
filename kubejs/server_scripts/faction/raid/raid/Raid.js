
/**
 * @class
 * @classdesc 袭击
 * @param {number} id
 * @param {Internal.ServerLevel} level 
 */
function $Raid(id, level) {
    /**
     * @description 标识符
     * @type {number}
     */
    this.id = id;
    /**
     * @description 维度
     * @type {Internal.ServerLevel}
     */
    this.level = level;
    /**
     * @description 标记是否开始
     * @type {boolean}
     */
    this.started = false;
    /**
     * @description 标记阶段
     * @type {$RaidType}
     */
    this.status = "ongoing";
    /**
     * @description tick时间
     */
    this.tickCounts = 0;
    /**
     * @description 冷却Tick时间
     */
    this.cooldownTicks = 300;
    /**
     * @description Bossbar
     */
    this.raidEvent = new ServerBossEvent(this.getRaidNameComponent(), this.getRaidBossBarColor(), this.getRaidBossBarOverlay());
    /**
     * @description 参与袭击的派系
     * @type {$Faction[]}
     */
    this.factions = [];
    /**
     * @description 场上的袭击者
     * @type {Set<$Raider>}
     */
    this.raiders = new Set();
    /**
     * @description 全部生命值
     * @type {number}
     */
    this.totalHealth = 0;
    /**
     * @description 已经生成的波次
     * @type {number}
     */
    this.wavesSpawned = 0;
    /**
    * @description 总波次
    * @type {number}
    */
    this.totalWaves = 0;
    /**
     * @description 强度
     * @type {number}
     */
    this.strength = 0;
    /**
     * @description 等级
     * @type {number}
     */
    this.badOmenLevel = 1;
}
/**
 * @description 获取中心位置
 * @returns {BlockPos}
 */
$Raid.prototype.getCenter = function () {

}
/**
 * @description 获取突袭BossBar名称组件
 * @returns {Internal.MutableComponent}
 */
$Raid.prototype.getRaidNameComponent = function () {

}
/**
 * @description 获取突袭胜利时BossBar名称组件
 * @returns {Internal.MutableComponent}
 */
$Raid.prototype.getRaidVictoryComponent = function () {

}
/**
 * @description 获取突袭失败时BossBar名称组件
 * @returns {Internal.MutableComponent}
 */
$Raid.prototype.getRaidLossComponent = function () {

}
/**
 * @description 获取突袭BossBar颜色值
 * @returns {Internal.BossEvent$BossBarColor_}
 */
$Raid.prototype.getRaidBossBarColor = function () {

}
/**
 * @description 获取突袭BossBar显示样式
 * @returns {Internal.BossEvent$BossBarOverlay_}
 */
$Raid.prototype.getRaidBossBarOverlay = function () {

}
/**
 * @description 获取存活的Raider数量
 * @returns {number}
 */
$Raid.prototype.getTotalRaidersAlive = function () {

}
/**
 * @description 获取总生命值
 * @returns {number}
 */
$Raid.prototype.getTotalHealth = function () {
    return this.totalHealth;
}
/**
 * @description 已经开始？
 * @returns {boolean}
 */
$Raid.prototype.isStarted = function () {
    return this.started;
}
/**
 * @description 已经结束？
 * @returns {boolean}
 */
$Raid.prototype.isStoped = function () {
    return this.status == "stoped";
}
/**
 * @description 已经分出胜负？
 * @returns {boolean}
 */
$Raid.prototype.isOver = function () {
    return this.victory() || this.loss();
}
/**
 * @description 已经失败？
 * @returns {boolean}
 */
$Raid.prototype.isLoss = function () {
    return this.status == "loss";
}
/**
 * @description 已经胜利？
 * @returns {boolean}
 */
$Raid.prototype.isVictory = function () {
    return this.status == "victory";
}
/**
 * @description 胜利
 */
$Raid.prototype.victory = function () {
    this.raidEvent.setName(this.getRaidVictoryComponent());
    this.raidEvent.setProgress(0.0);
    this.status = "victory";
}
/**
 * @description 失败
 */
$Raid.prototype.loss = function () {
    this.raidEvent.setName(this.getRaidLossComponent());
    this.status = "loss";
}
/**
 * @description 开始
 */
$Raid.prototype.start = function () {
    this.raidEvent.setVisible(true);
    this.status = "ongoing";
    this.started = true;
}
/**
 * @description 结束
 */
$Raid.prototype.stop = function () {
    this.raidEvent.removeAllPlayers();
    this.raidEvent.setVisible(false);
    this.status = "stoped";
}
/**
 * @description 失败条件
 * @returns {boolean}
 */
$Raid.prototype.lossCondition = function () {

}
/**
 * @description 有更多的波次
 * @returns {boolean}
 */
$Raid.prototype.hasMoreWaves = function () {
    return this.wavesSpawned < this.totalWaves;
}
/**
 * @description 强度计算
 */
$Raid.prototype.computedStrength = function () {
    /**@type {$FactionEntity[]} */
    let factionEntity = [];
    this.level.getEntitiesWithin(AABB.ofSize(this.getCenter(), 56, 56, 56)).forEach(/**@param {Internal.Mob} mobEntity */mobEntity => {
        if (mobEntity instanceof Mob) {
            factionEntity.push($FactionEntityHelper.getFactionEntity(mobEntity));
        }
    });

}
/**
 * @description 寻找随机生成位置
 * @param {number} offsetMultiplier 
 * @param {number} maxTry
 * @returns {Internal.BlockPos$MutableBlockPos | undefined}
 */
$Raid.prototype.findRandomSpawnPos = function (offsetMultiplier, maxTry) {
    let offset = offsetMultiplier == 0 ? 2 : 2 - offsetMultiplier;
    /**
     * 寻找生成位置
     */
    blockpos$mutableblockpos = new MutableBlockPos();

    // let offsetMultiplier = 1; // 偏移值
    let blockpos = this.getCenter();

    for (let tryCount = 0; tryCount < maxTry; tryCount++) {
        let randomNumber = this.level.random.nextFloat() * (JavaMath.PI * 2);

        let x = blockpos.getX() + Mth.floor(Mth.cos(randomNumber) * 32.0 * offset) + this.level.random.nextInt(5);
        let z = blockpos.getZ() + Mth.floor(Mth.cos(randomNumber) * 32.0 * offset) + this.level.random.nextInt(5);
        let y = this.level.getHeight(Heightmap$Types.WORLD_SURFACE, x, z);

        blockpos$mutableblockpos.set(x, y, z);
        if (this.level.hasChunkAt(blockpos$mutableblockpos.getX() - 10, blockpos$mutableblockpos.getZ() - 10), blockpos$mutableblockpos.getX() + 10, blockpos$mutableblockpos.getZ() + 10) {
            return blockpos$mutableblockpos;
        }
    }
    return;
}
/**
 * @description 生成波次
 */
$Raid.prototype.spawnWaves = function () {
    /**
     * 获取生成实体权重表
     */

    /**
     * 进行生成 直至本次强度值耗尽
     */
}
/**
 * @description 获取存活的Raiders生命值
 * @returns {number}
 */
$Raid.prototype.getHealthOfLivingRaiders = function () {
    let healthOfLivingRaiders = 0;
    for (const raider of this.raiders) {
        healthOfLivingRaiders += raider.getEntity().getHealth();
    }
    return healthOfLivingRaiders;
}
/**
 * @description 更新Raiders
 */
$Raid.prototype.updateRaiders = function () {
    for (const raid of this.raiders) {
        if (raid.getEntity().blockPosition().distSqr(this.getCenter()) >= $Raid.RAID_REMOVAL_THRESHOLD_SQR) {
            this.raiders.delete(raid);
        }
    }
}
/**
 * @description 更新Players
 */
$Raid.prototype.updateRaiders = function () {
    this.level.getPlayers().forEach(/**@param {Internal.ServerPlayer} player */ player => {
        if (player.blockPosition().distSqr(this.getCenter()) < $Raid.RAID_REMOVAL_THRESHOLD_SQR) {
            this.raidEvent.addPlayer(player);
        }
    });
    this.raidEvent.players.stream().forEach(player => {
        if (player.blockPosition().distSqr(this.getCenter()) >= $Raid.RAID_REMOVAL_THRESHOLD_SQR) {
            this.raidEvent.removePlayer(player);
        }
    })
}
/**
 * @description 每刻执行
 */
$Raid.prototype.tick = function () {
    /**
     * 结束 
     */
    if (this.isStoped()) return;
    /**
     * 计时器
     */
    this.tickCounts++;
    if (this.tickCounts >= $Raid.RAID_TIMEOUT_TICKS) {
        this.stop();
        return;
    }
    /**
     * 初始
     */
    if (!this.isStarted()) {
        this.raidEvent.setProgress($Math.clamp((300 - this.cooldownTicks) / 300, 0.0, 1.0));
        this.cooldownTicks--;
        if (this.cooldownTicks <= 0) {
            this.cooldownTicks = 300;
            this.start();
        }
        return;
    }
    /**
     * 开始
     */
    // 未分出胜负
    if (!this.isOver()) {
        // 更新Raiders Players
        this.updateRaiders();
        this.updatePlayers();
        let totalRaidersAlive = this.getTotalRaidersAlive();
        // 如果还有存活Raider
        if (totalRaidersAlive > 0) {
            // 更新BossBar值
            this.raidEvent.setProgress($Math.clamp((this.getTotalRaidersAlive() / this.getTotalHealth()) / this.getTotalHealth(), 0.0, 1.0));
            // 如果存活数量小于等于2 更新Bossbar Name
            if (totalRaidersAlive <= 2) {
                this.raidEvent.setName($Raid.RAIDERS_REMAINING(totalRaidersAlive));
            }
        }
        // 如果没有存活Raider 且还有更多波次
        else if (this.hasMoreWaves()) {
            // 设置BossBar 显示名称 值
            if (this.cooldownTicks % 20 == 0) {
                this.raidEvent.setName(this.getRaidNameComponent());
                this.raidEvent.setProgress($Math.clamp((300 - this.cooldownTicks) / 300, 0.0, 1.0));
                this.cooldownTicks--;
                // 判断是否失败
                if (this.lossCondition()) {
                    this.loss();
                    return;
                }
            }
            // 冷却值归零时生成
            if (this.cooldownTicks <= 0) {
                this.cooldownTicks = 300;
                this.spawnWaves();
            }
        }
        // 如果没有存活Raider 且没有更多波次 胜利
        else {
            this.victory();
            return;
        }
    }
    // 分出胜负
    else {
        this.cooldownTicks--;
        // 冷却值归零时结束
        if (this.cooldownTicks <= 0) {
            this.stop()
            return;
        }
    }
}

/**
 * @description Raid的名称 胜利 失败 剩下的
 */
$Raid.RAID_NAME_COMPONENT = Component.translatable("event.minecraft.raid");
$Raid.VICTORY = Component.translatable("event.minecraft.raid.victory");
$Raid.DEFEAT = Component.translatable("event.minecraft.raid.defeat");
$Raid.RAID_BAR_VICTORY_COMPONENT = $Raid.RAID_NAME_COMPONENT.copy().append(" - ").append($Raid.VICTORY);
$Raid.RAID_BAR_DEFEAT_COMPONENT = $Raid.RAID_NAME_COMPONENT.copy().append(" - ").append($Raid.DEFEAT);
/**
 * @type {(value: number) => Internal.MutableComponent}
 * @description 剩下的Raiders 显示组件
 * @param {number} raidersAlive 
 * @returns {Internal.MutableComponent}
 */
$Raid.RAIDERS_REMAINING = (raidersAlive) => Component.translatable("event.minecraft.raid.raiders_remaining", raidersAlive);
/**
 * @description 距离的平方
 */
$Raid.RAID_REMOVAL_THRESHOLD_SQR = 12544;
/**
 * @description 超时
 */
$Raid.RAID_TIMEOUT_TICKS = 48000;