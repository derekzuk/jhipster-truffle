package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.ImageUpload;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the ImageUpload entity.
 */
@Repository
public interface ImageUploadRepository extends JpaRepository<ImageUpload, Long> {

}
