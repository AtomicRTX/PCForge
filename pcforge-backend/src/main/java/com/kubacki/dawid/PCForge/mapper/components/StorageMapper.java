package com.kubacki.dawid.PCForge.mapper.components;

import com.kubacki.dawid.PCForge.dto.components.StorageDto;
import com.kubacki.dawid.PCForge.models.components.Storage;

public class StorageMapper {
    public static StorageDto mapToStorageDto(Storage storage) {
        return new StorageDto(
                storage.getSt_id(),
                storage.getName(),
                storage.getProducer(),
                storage.getSize()
        );
    }
}
