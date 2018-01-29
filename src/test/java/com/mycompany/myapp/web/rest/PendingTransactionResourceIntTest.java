package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.Jhiptruffle2App;

import com.mycompany.myapp.domain.PendingTransaction;
import com.mycompany.myapp.repository.PendingTransactionRepository;
import com.mycompany.myapp.service.dto.PendingTransactionDTO;
import com.mycompany.myapp.service.mapper.PendingTransactionMapper;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the PendingTransactionResource REST controller.
 *
 * @see PendingTransactionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Jhiptruffle2App.class)
public class PendingTransactionResourceIntTest {

    private static final String DEFAULT_SENDER = "AAAAAAAAAA";
    private static final String UPDATED_SENDER = "BBBBBBBBBB";

    private static final String DEFAULT_RECEIVER = "AAAAAAAAAA";
    private static final String UPDATED_RECEIVER = "BBBBBBBBBB";

    private static final Integer DEFAULT_TOKEN_QUANTITY = 1;
    private static final Integer UPDATED_TOKEN_QUANTITY = 2;

    private static final String DEFAULT_TRANSACTION_HASH = "AAAAAAAAAA";
    private static final String UPDATED_TRANSACTION_HASH = "BBBBBBBBBB";

    @Autowired
    private PendingTransactionRepository pendingTransactionRepository;

    @Autowired
    private PendingTransactionMapper pendingTransactionMapper;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPendingTransactionMockMvc;

    private PendingTransaction pendingTransaction;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PendingTransactionResource pendingTransactionResource = new PendingTransactionResource(pendingTransactionRepository, pendingTransactionMapper);
        this.restPendingTransactionMockMvc = MockMvcBuilders.standaloneSetup(pendingTransactionResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PendingTransaction createEntity(EntityManager em) {
        PendingTransaction pendingTransaction = new PendingTransaction()
            .sender(DEFAULT_SENDER)
            .receiver(DEFAULT_RECEIVER)
            .tokenQuantity(DEFAULT_TOKEN_QUANTITY)
            .transactionHash(DEFAULT_TRANSACTION_HASH);
        return pendingTransaction;
    }

    @Before
    public void initTest() {
        pendingTransaction = createEntity(em);
    }

    @Test
    @Transactional
    public void createPendingTransaction() throws Exception {
        int databaseSizeBeforeCreate = pendingTransactionRepository.findAll().size();

        // Create the PendingTransaction
        PendingTransactionDTO pendingTransactionDTO = pendingTransactionMapper.toDto(pendingTransaction);
        restPendingTransactionMockMvc.perform(post("/api/pending-transactions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pendingTransactionDTO)))
            .andExpect(status().isCreated());

        // Validate the PendingTransaction in the database
        List<PendingTransaction> pendingTransactionList = pendingTransactionRepository.findAll();
        assertThat(pendingTransactionList).hasSize(databaseSizeBeforeCreate + 1);
        PendingTransaction testPendingTransaction = pendingTransactionList.get(pendingTransactionList.size() - 1);
        assertThat(testPendingTransaction.getSender()).isEqualTo(DEFAULT_SENDER);
        assertThat(testPendingTransaction.getReceiver()).isEqualTo(DEFAULT_RECEIVER);
        assertThat(testPendingTransaction.getTokenQuantity()).isEqualTo(DEFAULT_TOKEN_QUANTITY);
        assertThat(testPendingTransaction.getTransactionHash()).isEqualTo(DEFAULT_TRANSACTION_HASH);
    }

    @Test
    @Transactional
    public void createPendingTransactionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = pendingTransactionRepository.findAll().size();

        // Create the PendingTransaction with an existing ID
        pendingTransaction.setId(1L);
        PendingTransactionDTO pendingTransactionDTO = pendingTransactionMapper.toDto(pendingTransaction);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPendingTransactionMockMvc.perform(post("/api/pending-transactions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pendingTransactionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the PendingTransaction in the database
        List<PendingTransaction> pendingTransactionList = pendingTransactionRepository.findAll();
        assertThat(pendingTransactionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPendingTransactions() throws Exception {
        // Initialize the database
        pendingTransactionRepository.saveAndFlush(pendingTransaction);

        // Get all the pendingTransactionList
        restPendingTransactionMockMvc.perform(get("/api/pending-transactions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pendingTransaction.getId().intValue())))
            .andExpect(jsonPath("$.[*].sender").value(hasItem(DEFAULT_SENDER.toString())))
            .andExpect(jsonPath("$.[*].receiver").value(hasItem(DEFAULT_RECEIVER.toString())))
            .andExpect(jsonPath("$.[*].tokenQuantity").value(hasItem(DEFAULT_TOKEN_QUANTITY)))
            .andExpect(jsonPath("$.[*].transactionHash").value(hasItem(DEFAULT_TRANSACTION_HASH.toString())));
    }

    @Test
    @Transactional
    public void getPendingTransaction() throws Exception {
        // Initialize the database
        pendingTransactionRepository.saveAndFlush(pendingTransaction);

        // Get the pendingTransaction
        restPendingTransactionMockMvc.perform(get("/api/pending-transactions/{id}", pendingTransaction.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(pendingTransaction.getId().intValue()))
            .andExpect(jsonPath("$.sender").value(DEFAULT_SENDER.toString()))
            .andExpect(jsonPath("$.receiver").value(DEFAULT_RECEIVER.toString()))
            .andExpect(jsonPath("$.tokenQuantity").value(DEFAULT_TOKEN_QUANTITY))
            .andExpect(jsonPath("$.transactionHash").value(DEFAULT_TRANSACTION_HASH.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPendingTransaction() throws Exception {
        // Get the pendingTransaction
        restPendingTransactionMockMvc.perform(get("/api/pending-transactions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePendingTransaction() throws Exception {
        // Initialize the database
        pendingTransactionRepository.saveAndFlush(pendingTransaction);
        int databaseSizeBeforeUpdate = pendingTransactionRepository.findAll().size();

        // Update the pendingTransaction
        PendingTransaction updatedPendingTransaction = pendingTransactionRepository.findOne(pendingTransaction.getId());
        // Disconnect from session so that the updates on updatedPendingTransaction are not directly saved in db
        em.detach(updatedPendingTransaction);
        updatedPendingTransaction
            .sender(UPDATED_SENDER)
            .receiver(UPDATED_RECEIVER)
            .tokenQuantity(UPDATED_TOKEN_QUANTITY)
            .transactionHash(UPDATED_TRANSACTION_HASH);
        PendingTransactionDTO pendingTransactionDTO = pendingTransactionMapper.toDto(updatedPendingTransaction);

        restPendingTransactionMockMvc.perform(put("/api/pending-transactions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pendingTransactionDTO)))
            .andExpect(status().isOk());

        // Validate the PendingTransaction in the database
        List<PendingTransaction> pendingTransactionList = pendingTransactionRepository.findAll();
        assertThat(pendingTransactionList).hasSize(databaseSizeBeforeUpdate);
        PendingTransaction testPendingTransaction = pendingTransactionList.get(pendingTransactionList.size() - 1);
        assertThat(testPendingTransaction.getSender()).isEqualTo(UPDATED_SENDER);
        assertThat(testPendingTransaction.getReceiver()).isEqualTo(UPDATED_RECEIVER);
        assertThat(testPendingTransaction.getTokenQuantity()).isEqualTo(UPDATED_TOKEN_QUANTITY);
        assertThat(testPendingTransaction.getTransactionHash()).isEqualTo(UPDATED_TRANSACTION_HASH);
    }

    @Test
    @Transactional
    public void updateNonExistingPendingTransaction() throws Exception {
        int databaseSizeBeforeUpdate = pendingTransactionRepository.findAll().size();

        // Create the PendingTransaction
        PendingTransactionDTO pendingTransactionDTO = pendingTransactionMapper.toDto(pendingTransaction);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPendingTransactionMockMvc.perform(put("/api/pending-transactions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pendingTransactionDTO)))
            .andExpect(status().isCreated());

        // Validate the PendingTransaction in the database
        List<PendingTransaction> pendingTransactionList = pendingTransactionRepository.findAll();
        assertThat(pendingTransactionList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deletePendingTransaction() throws Exception {
        // Initialize the database
        pendingTransactionRepository.saveAndFlush(pendingTransaction);
        int databaseSizeBeforeDelete = pendingTransactionRepository.findAll().size();

        // Get the pendingTransaction
        restPendingTransactionMockMvc.perform(delete("/api/pending-transactions/{id}", pendingTransaction.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<PendingTransaction> pendingTransactionList = pendingTransactionRepository.findAll();
        assertThat(pendingTransactionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PendingTransaction.class);
        PendingTransaction pendingTransaction1 = new PendingTransaction();
        pendingTransaction1.setId(1L);
        PendingTransaction pendingTransaction2 = new PendingTransaction();
        pendingTransaction2.setId(pendingTransaction1.getId());
        assertThat(pendingTransaction1).isEqualTo(pendingTransaction2);
        pendingTransaction2.setId(2L);
        assertThat(pendingTransaction1).isNotEqualTo(pendingTransaction2);
        pendingTransaction1.setId(null);
        assertThat(pendingTransaction1).isNotEqualTo(pendingTransaction2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(PendingTransactionDTO.class);
        PendingTransactionDTO pendingTransactionDTO1 = new PendingTransactionDTO();
        pendingTransactionDTO1.setId(1L);
        PendingTransactionDTO pendingTransactionDTO2 = new PendingTransactionDTO();
        assertThat(pendingTransactionDTO1).isNotEqualTo(pendingTransactionDTO2);
        pendingTransactionDTO2.setId(pendingTransactionDTO1.getId());
        assertThat(pendingTransactionDTO1).isEqualTo(pendingTransactionDTO2);
        pendingTransactionDTO2.setId(2L);
        assertThat(pendingTransactionDTO1).isNotEqualTo(pendingTransactionDTO2);
        pendingTransactionDTO1.setId(null);
        assertThat(pendingTransactionDTO1).isNotEqualTo(pendingTransactionDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(pendingTransactionMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(pendingTransactionMapper.fromId(null)).isNull();
    }
}
