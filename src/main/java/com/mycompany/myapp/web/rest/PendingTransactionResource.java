package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.PendingTransaction;

import com.mycompany.myapp.repository.PendingTransactionRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import com.mycompany.myapp.service.dto.PendingTransactionDTO;
import com.mycompany.myapp.service.mapper.PendingTransactionMapper;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing PendingTransactionScheduler.
 */
@RestController
@RequestMapping("/api")
public class PendingTransactionResource {

    private final Logger log = LoggerFactory.getLogger(PendingTransactionResource.class);

    private static final String ENTITY_NAME = "pendingTransaction";

    private final PendingTransactionRepository pendingTransactionRepository;

    private final PendingTransactionMapper pendingTransactionMapper;

    public PendingTransactionResource(PendingTransactionRepository pendingTransactionRepository, PendingTransactionMapper pendingTransactionMapper) {
        this.pendingTransactionRepository = pendingTransactionRepository;
        this.pendingTransactionMapper = pendingTransactionMapper;
    }

    /**
     * POST  /pending-transactions : Create a new pendingTransaction.
     *
     * @param pendingTransactionDTO the pendingTransactionDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new pendingTransactionDTO, or with status 400 (Bad Request) if the pendingTransaction has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/pending-transactions")
    @Timed
    public ResponseEntity<PendingTransactionDTO> createPendingTransaction(@RequestBody PendingTransactionDTO pendingTransactionDTO) throws URISyntaxException {
        log.debug("REST request to save PendingTransactionScheduler : {}", pendingTransactionDTO);
        if (pendingTransactionDTO.getId() != null) {
            throw new BadRequestAlertException("A new pendingTransaction cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PendingTransaction pendingTransaction = pendingTransactionMapper.toEntity(pendingTransactionDTO);
        pendingTransaction = pendingTransactionRepository.save(pendingTransaction);
        PendingTransactionDTO result = pendingTransactionMapper.toDto(pendingTransaction);
        return ResponseEntity.created(new URI("/api/pending-transactions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /pending-transactions : Updates an existing pendingTransaction.
     *
     * @param pendingTransactionDTO the pendingTransactionDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated pendingTransactionDTO,
     * or with status 400 (Bad Request) if the pendingTransactionDTO is not valid,
     * or with status 500 (Internal Server Error) if the pendingTransactionDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/pending-transactions")
    @Timed
    public ResponseEntity<PendingTransactionDTO> updatePendingTransaction(@RequestBody PendingTransactionDTO pendingTransactionDTO) throws URISyntaxException {
        log.debug("REST request to update PendingTransactionScheduler : {}", pendingTransactionDTO);
        if (pendingTransactionDTO.getId() == null) {
            return createPendingTransaction(pendingTransactionDTO);
        }
        PendingTransaction pendingTransaction = pendingTransactionMapper.toEntity(pendingTransactionDTO);
        pendingTransaction = pendingTransactionRepository.save(pendingTransaction);
        PendingTransactionDTO result = pendingTransactionMapper.toDto(pendingTransaction);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, pendingTransactionDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /pending-transactions : get all the pendingTransactions.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of pendingTransactions in body
     */
    @GetMapping("/pending-transactions")
    @Timed
    public List<PendingTransactionDTO> getAllPendingTransactions() {
        log.debug("REST request to get all PendingTransactions");
        List<PendingTransaction> pendingTransactions = pendingTransactionRepository.findAll();
        return pendingTransactionMapper.toDto(pendingTransactions);
        }

    /**
     * GET  /pending-transactions/:id : get the "id" pendingTransaction.
     *
     * @param id the id of the pendingTransactionDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the pendingTransactionDTO, or with status 404 (Not Found)
     */
    @GetMapping("/pending-transactions/{id}")
    @Timed
    public ResponseEntity<PendingTransactionDTO> getPendingTransaction(@PathVariable Long id) {
        log.debug("REST request to get PendingTransactionScheduler : {}", id);
        PendingTransaction pendingTransaction = pendingTransactionRepository.findOne(id);
        PendingTransactionDTO pendingTransactionDTO = pendingTransactionMapper.toDto(pendingTransaction);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(pendingTransactionDTO));
    }

    /**
     * DELETE  /pending-transactions/:id : delete the "id" pendingTransaction.
     *
     * @param id the id of the pendingTransactionDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/pending-transactions/{id}")
    @Timed
    public ResponseEntity<Void> deletePendingTransaction(@PathVariable Long id) {
        log.debug("REST request to delete PendingTransactionScheduler : {}", id);
        pendingTransactionRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
