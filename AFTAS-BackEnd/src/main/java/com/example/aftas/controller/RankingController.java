package com.example.aftas.controller;

import com.example.aftas.dto.TopRankingDTO;
import com.example.aftas.dto.UpdateRankingRequestDTO;
import com.example.aftas.config.handlers.response.ResponseMessage;
import com.example.aftas.model.RankId;
import com.example.aftas.model.Ranking;
import com.example.aftas.service.RankingService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/rankings")
public class RankingController {
    private final RankingService rankingService;

    public RankingController(RankingService rankingService) {
        this.rankingService = rankingService;
    }


    @PreAuthorize("hasAnyAuthority('VIEW_RANKING_BY_MEMBER_AND_COMPETITION')")
    @GetMapping("/{competitionId}/{memberId}")
    public ResponseEntity getRankingsByMemberIdAndCompetitionId(@PathVariable Long competitionId, @PathVariable Long memberId) {
        Ranking ranking = rankingService.getRankingsByMemberIdAndCompetitionId(competitionId, memberId);
        return ResponseMessage.ok(ranking,"Success");
    }

    @PreAuthorize("hasAnyAuthority('UPDATE_RANKING_BY_MEMBER_AND_COMPETITION')")
    @PutMapping("/{competitionId}/{memberId}")
    public ResponseEntity updateRanking(@Valid @RequestBody UpdateRankingRequestDTO updateRankingRequestDTO, @PathVariable Long competitionId, @PathVariable Long memberId) {
        Ranking ranking1 = rankingService.updateRanking(updateRankingRequestDTO.toRanking(), competitionId , memberId);
        return ResponseMessage.ok(ranking1,"Success");
    }


    @PreAuthorize("hasAnyAuthority('REGISTER_MEMBER_TO_COMPETITION')")
    @PostMapping("/register")
    public ResponseEntity registerMemberForCompetition(@Valid @RequestBody Ranking ranking) {
        Ranking registeredRanking = rankingService.registerMemberForCompetition(ranking);
        return ResponseMessage.created(registeredRanking, "Member registered successfully");

    }

    @PreAuthorize("hasAnyAuthority('VIEW_TOP_3')")
    @GetMapping("/top3/{competitionId}")
    public ResponseEntity<List<TopRankingDTO>> getTop3RankingsByCompetitionId(@PathVariable Long competitionId) {
        List<TopRankingDTO> top3Rankings = rankingService.findTop3ByCompetitionIdOrderByScoreDesc(competitionId);
        if (top3Rankings.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(top3Rankings);
        }
    }

}
