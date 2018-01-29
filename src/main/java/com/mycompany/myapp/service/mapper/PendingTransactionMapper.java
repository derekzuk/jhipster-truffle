package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.*;
import com.mycompany.myapp.service.dto.PendingTransactionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity PendingTransaction and its DTO PendingTransactionDTO.
 */
@Mapper(componentModel = "spring", uses = {ImageMapper.class})
public interface PendingTransactionMapper extends EntityMapper<PendingTransactionDTO, PendingTransaction> {

    @Mapping(source = "image.id", target = "imageId")
    PendingTransactionDTO toDto(PendingTransaction pendingTransaction); 

    @Mapping(source = "imageId", target = "image")
    PendingTransaction toEntity(PendingTransactionDTO pendingTransactionDTO);

    default PendingTransaction fromId(Long id) {
        if (id == null) {
            return null;
        }
        PendingTransaction pendingTransaction = new PendingTransaction();
        pendingTransaction.setId(id);
        return pendingTransaction;
    }
}
