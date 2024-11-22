EntityEvents.death(event => {
    let stringUuid = String(event.entity.getStringUuid());
    if ($FactionEntity.VALUES.has(stringUuid)) {
        $FactionEntity.VALUES.delete(stringUuid);
    }
})