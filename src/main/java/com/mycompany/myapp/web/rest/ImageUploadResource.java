package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.config.Constants;
import com.mycompany.myapp.domain.ImageUpload;
import com.mycompany.myapp.domain.User;
import com.mycompany.myapp.repository.ImageUploadRepository;
import com.mycompany.myapp.repository.UserRepository;
import com.mycompany.myapp.security.AuthoritiesConstants;
import com.mycompany.myapp.service.ImageUploadService;
import com.mycompany.myapp.service.MailService;
import com.mycompany.myapp.service.UserService;
import com.mycompany.myapp.service.dto.ImageUploadDTO;
import com.mycompany.myapp.service.dto.UserDTO;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import com.mycompany.myapp.web.rest.errors.EmailAlreadyUsedException;
import com.mycompany.myapp.web.rest.errors.LoginAlreadyUsedException;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import com.mycompany.myapp.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class ImageUploadResource {

    private final Logger log = LoggerFactory.getLogger(ImageUploadResource.class);

    private final ImageUploadRepository imageUploadRepository;

    private final ImageUploadService imageUploadService;

    public ImageUploadResource(ImageUploadRepository imageUploadRepository, ImageUploadService imageUploadService) {
        this.imageUploadRepository = imageUploadRepository;
        this.imageUploadService = imageUploadService;
    }

    @PostMapping("/saveImage")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<ImageUpload> saveImage(@Valid @RequestBody ImageUploadDTO imageUploadDTO) throws URISyntaxException {
        log.debug("REST request to save Image Upload : {}", imageUploadDTO);

        ImageUpload imageToSave = imageUploadService.saveImage(imageUploadDTO);

            return ResponseEntity.created(new URI("/api/saveImage/" + imageToSave.getImagePath()))
                .headers(HeaderUtil.createAlert( "An image record is created: " + imageToSave.toString(), imageToSave.getImageUploadId().toString()))
                .body(imageToSave);
    }

}
