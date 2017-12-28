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

/**
 * REST controller for managing users.
 * <p>
 * This class accesses the User entity, and needs to fetch its collection of authorities.
 * <p>
 * For a normal use-case, it would be better to have an eager relationship between User and Authority,
 * and send everything to the client side: there would be no View Model and DTO, a lot less code, and an outer-join
 * which would be good for performance.
 * <p>
 * We use a View Model and a DTO for 3 reasons:
 * <ul>
 * <li>We want to keep a lazy association between the user and the authorities, because people will
 * quite often do relationships with the user, and we don't want them to get the authorities all
 * the time for nothing (for performance reasons). This is the #1 goal: we should not impact our users'
 * application because of this use-case.</li>
 * <li> Not having an outer join causes n+1 requests to the database. This is not a real issue as
 * we have by default a second-level cache. This means on the first HTTP call we do the n+1 requests,
 * but then all authorities come from the cache, so in fact it's much better than doing an outer join
 * (which will get lots of data from the database, for each HTTP call).</li>
 * <li> As this manages users, for security reasons, we'd rather have a DTO layer.</li>
 * </ul>
 * <p>
 * Another option would be to have a specific JPA entity graph to handle this case.
 */
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
