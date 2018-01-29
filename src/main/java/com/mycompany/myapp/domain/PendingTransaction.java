package com.mycompany.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A PendingTransaction.
 */
@Entity
@Table(name = "pending_transaction")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class PendingTransaction implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "sender")
    private String sender;

    @Column(name = "receiver")
    private String receiver;

    @Column(name = "token_quantity")
    private Integer tokenQuantity;

    @Column(name = "transaction_hash")
    private String transactionHash;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSender() {
        return sender;
    }

    public PendingTransaction sender(String sender) {
        this.sender = sender;
        return this;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getReceiver() {
        return receiver;
    }

    public PendingTransaction receiver(String receiver) {
        this.receiver = receiver;
        return this;
    }

    public void setReceiver(String receiver) {
        this.receiver = receiver;
    }

    public Integer getTokenQuantity() {
        return tokenQuantity;
    }

    public PendingTransaction tokenQuantity(Integer tokenQuantity) {
        this.tokenQuantity = tokenQuantity;
        return this;
    }

    public void setTokenQuantity(Integer tokenQuantity) {
        this.tokenQuantity = tokenQuantity;
    }

    public String getTransactionHash() {
        return transactionHash;
    }

    public PendingTransaction transactionHash(String transactionHash) {
        this.transactionHash = transactionHash;
        return this;
    }

    public void setTransactionHash(String transactionHash) {
        this.transactionHash = transactionHash;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        PendingTransaction pendingTransaction = (PendingTransaction) o;
        if (pendingTransaction.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), pendingTransaction.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PendingTransaction{" +
            "id=" + getId() +
            ", sender='" + getSender() + "'" +
            ", receiver='" + getReceiver() + "'" +
            ", tokenQuantity=" + getTokenQuantity() +
            ", transactionHash='" + getTransactionHash() + "'" +
            "}";
    }
}
