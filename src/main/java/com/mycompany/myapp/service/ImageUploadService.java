package com.mycompany.myapp.service;

import com.mycompany.myapp.config.Constants;
import com.mycompany.myapp.domain.Authority;
import com.mycompany.myapp.domain.ImageUpload;
import com.mycompany.myapp.domain.User;
import com.mycompany.myapp.repository.AuthorityRepository;
import com.mycompany.myapp.repository.ImageUploadRepository;
import com.mycompany.myapp.repository.UserRepository;
import com.mycompany.myapp.security.AuthoritiesConstants;
import com.mycompany.myapp.security.SecurityUtils;
import com.mycompany.myapp.service.dto.ImageUploadDTO;
import com.mycompany.myapp.service.dto.UserDTO;
import com.mycompany.myapp.service.util.RandomUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.CacheManager;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Service class for managing image uploads
 */
@Service
@Transactional
public class ImageUploadService {

    private final Logger log = LoggerFactory.getLogger(ImageUploadService.class);

    private final CacheManager cacheManager;

    private final ImageUploadRepository imageUploadRepository;

    public ImageUploadService(ImageUploadRepository imageUploadRepository, CacheManager cacheManager) {
        this.imageUploadRepository = imageUploadRepository;
        this.cacheManager = cacheManager;
    }

    public ImageUpload saveImage(ImageUploadDTO imageUploadDTO) {
        log.debug("Saving file", imageUploadDTO);

        ImageUpload imageToSave = new ImageUpload(imageUploadDTO);

        return imageUploadRepository.save(imageToSave);
    }

}
