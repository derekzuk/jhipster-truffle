package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mycompany.myapp.config.Constants;
import com.mycompany.myapp.service.dto.ImageUploadDTO;
import org.apache.commons.lang3.StringUtils;
import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.validator.constraints.Email;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Locale;
import java.util.Objects;
import java.util.Set;

/**
 * An image.
 */
@Entity
@Table(name = "image_upload")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ImageUpload extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long imageUploadId;

    @JsonIgnore
    @NotNull
    @Size(max = 1000)
    @Column(name = "image_path", length = 60)
    private String imagePath;

    @Size(max = 1000)
    @Column(name = "crypto_user", length = 50)
    private String cryptoUser;

    public ImageUpload(ImageUploadDTO imageUploadDTO) {
        this.imageUploadId = imageUploadDTO.getImageUploadId();
        this.imagePath = imageUploadDTO.getImagePath();
        this.cryptoUser = imageUploadDTO.getCryptoUser();
    }

    public Long getImageUploadId() {
        return imageUploadId;
    }

    public void setImageUploadId(Long imageUploadId) {
        this.imageUploadId = imageUploadId;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public String getCryptoUser() {
        return cryptoUser;
    }

    public void setCryptoUser(String cryptoUser) {
        this.cryptoUser = cryptoUser;
    }

    @Override
    public String toString() {
        return "ImageUpload{" +
            "imageUploadId=" + imageUploadId +
            ", imagePath='" + imagePath + '\'' +
            ", cryptoUser='" + cryptoUser + '\'' +
            '}';
    }
}
