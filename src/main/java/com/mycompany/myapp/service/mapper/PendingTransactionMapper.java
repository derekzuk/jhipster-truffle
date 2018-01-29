package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.*;
import com.mycompany.myapp.service.dto.PendingTransactionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity PendingTransactionScheduler and its DTO PendingTransactionDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface PendingTransactionMapper extends EntityMapper<PendingTransactionDTO, PendingTransaction> {





    default PendingTransaction fromId(Long id) {
        if (id == null) {
            return null;
        }
        PendingTransaction pendingTransaction = new PendingTransaction();
        pendingTransaction.setId(id);
        return pendingTransaction;
    }
}
