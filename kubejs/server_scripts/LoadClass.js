// priority: 999999
const Entity = Java.loadClass('net.minecraft.world.entity.Entity');
const Mob = Java.loadClass('net.minecraft.world.entity.Mob');
const NearestAttackableTargetGoal = Java.loadClass('net.minecraft.world.entity.ai.goal.target.NearestAttackableTargetGoal');
const TagKey = Java.loadClass('net.minecraft.tags.TagKey');
const Registries = Java.loadClass('net.minecraft.core.registries.Registries');
const ResourceKey = Java.loadClass('net.minecraft.resources.ResourceKey');
const BuiltInRegistries = Java.loadClass('net.minecraft.core.registries.BuiltInRegistries');
const ResourceLocation = Java.loadClass('net.minecraft.resources.ResourceLocation');
const ForgeRegistries = Java.loadClass('net.minecraftforge.registries.ForgeRegistries');
const ForgeRegistryTag = Java.loadClass('net.minecraftforge.registries.ForgeRegistryTag');
const EntityType = Java.loadClass('net.minecraft.world.entity.EntityType');
const Optional = Java.loadClass('java.util.Optional');
const ForgeRegistryTagManager = Java.loadClass('net.minecraftforge.registries.ForgeRegistryTagManager');
const Collectors = Java.loadClass('java.util.stream.Collectors');
const ServerBossEvent = Java.loadClass("net.minecraft.server.level.ServerBossEvent");
const NaturalSpawner = Java.loadClass("net.minecraft.world.level.NaturalSpawner")
const SpawnPlacements = Java.loadClass("net.minecraft.world.entity.SpawnPlacements");
const ClientboundSoundPacket = Java.loadClass("net.minecraft.network.protocol.game.ClientboundSoundEntityPacket");
const SoundSource = Java.loadClass("net.minecraft.sounds.SoundSource");

const MinecraftServer = Java.loadClass("net.minecraft.server.MinecraftServer");
const GameRules = Java.loadClass("net.minecraft.world.level.GameRules");
const Heightmap$Types = Java.loadClass("net.minecraft.world.level.levelgen.Heightmap$Types");
const MutableBlockPos = Java.loadClass("net.minecraft.core.BlockPos$MutableBlockPos");
/**
 * NBT
 */
const Tag = Java.loadClass("net.minecraft.nbt.Tag");
const CompoundTag = Java.loadClass('net.minecraft.nbt.CompoundTag');
const StringTag = Java.loadClass('net.minecraft.nbt.StringTag');
const CollectionTag = Java.loadClass('net.minecraft.nbt.CollectionTag');
const ByteArrayTag = Java.loadClass('net.minecraft.nbt.ByteArrayTag');
const DoubleTag = Java.loadClass('net.minecraft.nbt.DoubleTag');
const FloatTag = Java.loadClass('net.minecraft.nbt.FloatTag');
const IntArrayTag = Java.loadClass('net.minecraft.nbt.IntArrayTag');
const IntTag = Java.loadClass('net.minecraft.nbt.IntTag');
const ListTag = Java.loadClass('net.minecraft.nbt.ListTag');
const LongArrayTag = Java.loadClass('net.minecraft.nbt.LongArrayTag');
const LongTag = Java.loadClass('net.minecraft.nbt.LongTag');

const NbtUtils = Java.loadClass("net.minecraft.nbt.NbtUtils");
const GoalUtils = Java.loadClass("net.minecraft.world.entity.ai.util.GoalUtils");

const OpenDoorGoal = Java.loadClass("net.minecraft.world.entity.ai.goal.OpenDoorGoal");
const MobSpawnType = Java.loadClass("net.minecraft.world.entity.MobSpawnType");
const Difficulty = Java.loadClass("net.minecraft.world.Difficulty");
const LivingEntity = Java.loadClass("net.minecraft.world.entity.LivingEntity");
const MobEffectInstance = Java.loadClass("net.minecraft.world.effect.MobEffectInstance");
const ServerPlayer = Java.loadClass("net.minecraft.server.level.ServerPlayer");
const ServerLevel = Java.loadClass("net.minecraft.server.level.ServerLevel");
const Mth = Java.loadClass("net.minecraft.util.Mth");
/**
 * Forge Events
 */
const LivingChangeTargetEvent = Java.loadClass("net.minecraftforge.event.entity.living.LivingChangeTargetEvent");
const LivingAttackEvent = Java.loadClass("net.minecraftforge.event.entity.living.LivingAttackEvent");
/**
 * Java Util
 */
// const JavaMath = Java.loadClass("java.lang.Math");