package com.mycompany.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.Min;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Image.
 */
@Entity
@Table(name = "image")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Image implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "crypto_user")
    private String crypto_user;

    @Column(name = "image_location")
    private String image_location;

    @Min(1)
    @Column(length = 10, nullable = false)
    private Integer upvoteCount;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCrypto_user() {
        return crypto_user;
    }

    public Image crypto_user(String crypto_user) {
        this.crypto_user = crypto_user;
        return this;
    }

    public void setCrypto_user(String crypto_user) {
        this.crypto_user = crypto_user;
    }

    public String getImage_location() {
        return image_location;
    }

    public Image image_location(String image_location) {
        this.image_location = image_location;
        return this;
    }

    public void setImage_location(String image_location) {
        this.image_location = image_location;
    }

    public Integer getUpvoteCount() {
        return upvoteCount;
    }

    public void setUpvoteCount(Integer upvoteCount) {
        this.upvoteCount = upvoteCount;
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
        Image image = (Image) o;
        if (image.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), image.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Image{" +
            "id=" + getId() +
            ", crypto_user='" + getCrypto_user() + "'" +
            ", image_location='" + getImage_location() + "'" +
            ", upvoteCount='" + getUpvoteCount() + "'" +
            "}";
    }

}
