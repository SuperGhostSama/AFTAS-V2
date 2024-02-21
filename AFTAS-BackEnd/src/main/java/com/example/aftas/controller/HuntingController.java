package com.example.aftas.controller;

import com.example.aftas.dto.HuntingRequestDTO;
import com.example.aftas.dto.HuntingUpdateRequestDTO;
import com.example.aftas.config.handlers.response.ResponseMessage;
import com.example.aftas.model.Hunting;
import com.example.aftas.service.HuntingService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/huntings")
public class HuntingController {

    private final HuntingService huntingService;

    public HuntingController(HuntingService huntingService) {
        this.huntingService = huntingService;
    }

    @PreAuthorize("hasAnyAuthority('CREATE_HUNTING')")
    // add hunting result
    @PostMapping("/add-hunting-result")
    public ResponseEntity addHuntingResult(@Valid @RequestBody HuntingRequestDTO huntingRequestDTO) {
        Hunting hunting = huntingService.addHuntingResult(huntingRequestDTO.toHunting());
        if(hunting == null) {
            return ResponseMessage.badRequest("Hunting result not added");
        }else {
            return ResponseMessage.created(hunting,"Hunting result added successfully");
        }
    }

    @PreAuthorize("hasAnyAuthority('VIEW_ONE_HUNTING')")
    // get hunting by id
    @GetMapping("/{id}")
    public ResponseEntity getHuntingById(@PathVariable Long id) {
        return ResponseMessage.ok(huntingService.getHuntingById(id), "Success");
    }

    @PreAuthorize("hasAnyAuthority('VIEW_HUNTING_BY_COMPETITION')")
    // get huntings by competition
    @GetMapping("/competition/{competitionId}")
    public ResponseEntity getHuntingsByCompetition(@PathVariable Long competitionId) {
        List<Hunting> huntings = huntingService.getHuntingsByCompetition(competitionId);
        if(huntings.isEmpty()) {
            return ResponseMessage.notFound("Huntings not found");
        }else {
            return ResponseMessage.ok(huntings, "Success");
        }
    }

    @PreAuthorize("hasAnyAuthority('VIEW_HUNTING_BY_COMPETITION_AND_MEMBER')")
    // get huntings by competition and member
    @GetMapping("/competition/{competitionId}/member/{memberId}")
    public ResponseEntity getHuntingsByCompetitionAndMember(@PathVariable Long competitionId, @PathVariable Long memberId) {
        List<Hunting> huntings = huntingService.getHuntingsByCompetitionAndMember(competitionId, memberId);
        if(huntings.isEmpty()) {
            return ResponseMessage.notFound("Huntings not found");
        }else {
            return ResponseMessage.ok(huntings, "Success");
        }
    }

    @PreAuthorize("hasAnyAuthority('UPDATE_HUNTING')")
    // update hunting
    @PutMapping("/{id}")
    public ResponseEntity updateHunting(@RequestBody HuntingUpdateRequestDTO huntingUpdateRequestDTO, @PathVariable Long id) {
        Hunting hunting = huntingService.updateHunting(huntingUpdateRequestDTO.toHunting(), id);
        if(hunting == null) {
            return ResponseMessage.badRequest("Hunting not updated");
        }else {
            return ResponseMessage.created(hunting, "Hunting updated successfully");
        }
    }

    @PreAuthorize("hasAnyAuthority('DELETE_HUNTING')")
    // delete hunting
    @DeleteMapping("/{id}")
    public ResponseEntity deleteHunting(@PathVariable Long id) {
        huntingService.deleteHunting(id);
        return ResponseMessage.ok(null,"Hunting deleted successfully");
    }
}
