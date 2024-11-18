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

const CompoundTag = Java.loadClass('net.minecraft.nbt.CompoundTag');
const StringTag = Java.loadClass('net.minecraft.nbt.StringTag');
// const CollectionTag = Java.loadClass('net.minecraft.nbt.CollectionTag');
// const ByteArrayTag = Java.loadClass('net.minecraft.nbt.ByteArrayTag');
// const DoubleTag = Java.loadClass('net.minecraft.nbt.DoubleTag');
// const FloatTag = Java.loadClass('net.minecraft.nbt.FloatTag');
// const IntArrayTag = Java.loadClass('net.minecraft.nbt.IntArrayTag');
// const IntTag = Java.loadClass('net.minecraft.nbt.IntTag');
// const ListTag = Java.loadClass('net.minecraft.nbt.ListTag');
// const LongArrayTag = Java.loadClass('net.minecraft.nbt.LongArrayTag');
// const LongTag = Java.loadClass('net.minecraft.nbt.LongTag');

