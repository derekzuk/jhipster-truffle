package com.mycompany.myapp.service.dto;

import com.mycompany.myapp.config.Constants;
import com.mycompany.myapp.domain.Authority;
import com.mycompany.myapp.domain.User;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotBlank;

import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.time.Instant;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * A DTO representing a user, with his authorities.
 */
public class ImageUploadDTO {

    private Long imageUploadId;

    @Size(max = 1000)
    private String imagePath;

    @Size(max = 1000)
    private String cryptoUser;

    public ImageUploadDTO(Long imageUploadId, String imagePath, String cryptoUser) {
        this.imageUploadId = imageUploadId;
        this.imagePath = imagePath;
        this.cryptoUser = cryptoUser;
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
        return "ImageUploadDTO{" +
            "imageUploadId=" + imageUploadId +
            ", imagePath='" + imagePath + '\'' +
            ", cryptoUser='" + cryptoUser + '\'' +
            '}';
    }
}
