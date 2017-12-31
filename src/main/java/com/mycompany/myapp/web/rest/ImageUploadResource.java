package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.ImageUpload;
import com.mycompany.myapp.service.ImageUploadService;
import com.mycompany.myapp.service.UserService;
import com.mycompany.myapp.service.dto.ImageUploadDTO;
import com.mycompany.myapp.service.dto.UserDTO;
import com.mycompany.myapp.web.rest.errors.InternalServerErrorException;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

@RestController
@RequestMapping("/api")
public class ImageUploadResource {

    private final Logger log = LoggerFactory.getLogger(ImageUploadResource.class);

    private final ImageUploadService imageUploadService;
    private final UserService userService;

    public ImageUploadResource(ImageUploadService imageUploadService, UserService userService) {
        this.imageUploadService = imageUploadService;
        this.userService = userService;
    }

    @PostMapping("/saveImage")
    @Timed
    public ResponseEntity<ImageUpload> saveImage(@Valid @RequestBody ImageUploadDTO imageUploadDTO) throws URISyntaxException {
        log.debug("REST request to save Image Upload : {}", imageUploadDTO);

        ImageUpload imageToSave = imageUploadService.saveImage(imageUploadDTO);

            return ResponseEntity.created(new URI("/api/saveImage/" + imageToSave.getImagePath()))
                .headers(HeaderUtil.createAlert( "An image record is created: " + imageToSave.toString(), imageToSave.getImageUploadId().toString()))
                .body(imageToSave);
    }

    @GetMapping("/getTest")
    public void getTest() {
        log.error("made it");
    }

}
