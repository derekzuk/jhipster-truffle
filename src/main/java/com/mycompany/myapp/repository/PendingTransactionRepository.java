package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.PendingTransaction;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the PendingTransactionScheduler entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PendingTransactionRepository extends JpaRepository<PendingTransaction, Long> {

}
