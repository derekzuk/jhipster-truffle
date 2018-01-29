package com.mycompany.myapp.service.dto;


import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the PendingTransaction entity.
 */
public class PendingTransactionDTO implements Serializable {

    private Long id;

    private String sender;

    private String receiver;

    private Integer tokenQuantity;

    private String transactionHash;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getReceiver() {
        return receiver;
    }

    public void setReceiver(String receiver) {
        this.receiver = receiver;
    }

    public Integer getTokenQuantity() {
        return tokenQuantity;
    }

    public void setTokenQuantity(Integer tokenQuantity) {
        this.tokenQuantity = tokenQuantity;
    }

    public String getTransactionHash() {
        return transactionHash;
    }

    public void setTransactionHash(String transactionHash) {
        this.transactionHash = transactionHash;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        PendingTransactionDTO pendingTransactionDTO = (PendingTransactionDTO) o;
        if(pendingTransactionDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), pendingTransactionDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PendingTransactionDTO{" +
            "id=" + getId() +
            ", sender='" + getSender() + "'" +
            ", receiver='" + getReceiver() + "'" +
            ", tokenQuantity=" + getTokenQuantity() +
            ", transactionHash='" + getTransactionHash() + "'" +
            "}";
    }
}
