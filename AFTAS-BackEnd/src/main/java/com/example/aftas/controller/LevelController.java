package com.example.aftas.controller;


import com.example.aftas.config.handlers.response.ResponseMessage;
import com.example.aftas.model.Level;
import com.example.aftas.service.LevelService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/v1/levels")
public class LevelController {

    private final LevelService levelService;

    public LevelController(LevelService levelService) {
        this.levelService = levelService;
    }

    @PreAuthorize("hasAnyAuthority('VIEW_ONE_LEVEL')")
    @GetMapping("/{id}")
    public ResponseEntity getLevelById(@PathVariable Long id) {
        Level level = levelService.getLevelById(id);
        if(level == null) {
            return ResponseMessage.notFound("Level not found");
        }else {
            return ResponseMessage.ok(level, "Success");
        }
    }

    @PreAuthorize("hasAnyAuthority('VIEW_LEVELS')")
    @GetMapping
    public ResponseEntity getAllLevels() {
        List<Level> levels = levelService.getAllLevels();
        if(levels.isEmpty()) {
            return ResponseMessage.notFound("Levels not found");
        }else {
            return ResponseMessage.ok(levels, "Success");
        }
    }

    @PreAuthorize("hasAnyAuthority('CREATE_LEVEL')")
    @PostMapping
    public ResponseEntity addLevel(@RequestBody Level level) {
        Level level1 = levelService.addLevel(level);
        if(level1 == null) {
            return ResponseMessage.badRequest("Level not created");
        }else {
            return ResponseMessage.created(level1, "Level created successfully");
        }
    }

    @PreAuthorize("hasAnyAuthority('UPDATE_LEVEL')")
    @PutMapping("/{id}")
    public ResponseEntity updateLevel(@Valid @RequestBody Level level, @PathVariable Long id) {
        Level level1 = levelService.updateLevel(level, id);
        if(level1 == null) {
            return ResponseMessage.badRequest("Level not updated");
        }else {
            return ResponseMessage.created(level1, "Level updated successfully");
        }
    }

    @PreAuthorize("hasAnyAuthority('DELETE_LEVEL')")
    @DeleteMapping("/{id}")
    public ResponseEntity deleteLevel(@PathVariable Long id) {
        Level level = levelService.getLevelById(id);
        if(level == null) {
            return ResponseMessage.notFound("Level not found");
        }else {
            levelService.deleteLevel(id);
            return ResponseMessage.ok(null,"Level deleted successfully");
        }
    }
}
