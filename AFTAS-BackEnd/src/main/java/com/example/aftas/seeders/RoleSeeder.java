package com.example.aftas.seeders;

import com.example.aftas.enums.AuthorityEnum;
import com.example.aftas.model.Authority;
import com.example.aftas.model.Role;
import com.example.aftas.repository.AuthorityRepository;
import com.example.aftas.repository.RoleRepository;
import com.example.aftas.service.AuthorityService;
import com.example.aftas.service.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@RequiredArgsConstructor
@Component
public class RoleSeeder implements CommandLineRunner {

    private final RoleService roleService;
    private final AuthorityService authorityService;
    private final RoleRepository roleRepository;
    private final AuthorityRepository authorityRepository;

    @Override
    public void run(String... args) {
        if (roleRepository.count() == 0) {
            seedRoles();
        }
    }

    private void seedRoles() {
        // USER MANAGEMENT AUTHORITY
        Authority grantAuthorityToRole = authorityService.getByName(AuthorityEnum.GRANT_AUTHORITY_TO_ROLE.toString())
                .orElseThrow(() -> new RuntimeException("GRANT_AUTHORITY_TO_ROLE authority not found"));

        Authority revokeAuthorityFromRole = authorityService.getByName(AuthorityEnum.REVOKE_AUTHORITY_FROM_ROLE.toString())
                .orElseThrow(() -> new RuntimeException("REVOKE_AUTHORITY_FROM_ROLE authority not found"));

        Authority assignRoleToUser = authorityService.getByName(AuthorityEnum.ASSIGN_ROLE_TO_USER.toString())
                .orElseThrow(() -> new RuntimeException("ASSIGN_ROLE_TO_USER authority not found"));

        Authority createRole = authorityService.getByName(AuthorityEnum.CREATE_ROLE.toString())
                .orElseThrow(() -> new RuntimeException("CREATE_ROLE authority not found"));

        Authority updateRole = authorityService.getByName(AuthorityEnum.UPDATE_ROLE.toString())
                .orElseThrow(() -> new RuntimeException("UPDATE_ROLE authority not found"));

        Authority deleteRole = authorityService.getByName(AuthorityEnum.DELETE_ROLE.toString())
                .orElseThrow(() -> new RuntimeException("DELETE_ROLE authority not found"));

        Authority viewRoles = authorityService.getByName(AuthorityEnum.VIEW_ROLES.toString())
                .orElseThrow(() -> new RuntimeException("VIEW_ROLES authority not found"));

        // USER AUTHORITY
        Authority updateUsers = authorityService.getByName(AuthorityEnum.UPDATE_USERS.toString())
                .orElseThrow(() -> new RuntimeException("UPDATE_USERS authority not found"));

        Authority viewUsers = authorityService.getByName(AuthorityEnum.VIEW_USERS.toString())
                .orElseThrow(() -> new RuntimeException("VIEW_USERS authority not found"));

        Authority deleteUsers = authorityService.getByName(AuthorityEnum.DELETE_USERS.toString())
                .orElseThrow(() -> new RuntimeException("DELETE_USERS authority not found"));

        Authority viewAuthorities = authorityService.getByName(AuthorityEnum.VIEW_AUTHORITIES.toString())
                .orElseThrow(() -> new RuntimeException("VIEW_AUTHORITIES authority not found"));

        // LEVELS AUTHORITY
        Authority viewLevels = authorityService.getByName(AuthorityEnum.VIEW_LEVELS.toString())
                .orElseThrow(() -> new RuntimeException("VIEW_LEVELS authority not found"));

        Authority viewOneLevel = authorityService.getByName(AuthorityEnum.VIEW_ONE_LEVEL.toString())
                .orElseThrow(() -> new RuntimeException("VIEW_ONE_LEVEL authority not found"));

        Authority createLevel = authorityService.getByName(AuthorityEnum.CREATE_LEVEL.toString())
                .orElseThrow(() -> new RuntimeException("CREATE_LEVEL authority not found"));

        Authority updateLevel = authorityService.getByName(AuthorityEnum.UPDATE_LEVEL.toString())
                .orElseThrow(() -> new RuntimeException("UPDATE_LEVEL authority not found"));

        Authority deleteLevel = authorityService.getByName(AuthorityEnum.DELETE_LEVEL.toString())
                .orElseThrow(() -> new RuntimeException("DELETE_LEVEL authority not found"));

        // FISH AUTHORITY
        Authority viewFishes = authorityService.getByName(AuthorityEnum.VIEW_FISHES.toString())
                .orElseThrow(() -> new RuntimeException("VIEW_FISHES authority not found"));

        Authority viewOneFish = authorityService.getByName(AuthorityEnum.VIEW_ONE_FISH.toString())
                .orElseThrow(() -> new RuntimeException("VIEW_ONE_FISH authority not found"));

        Authority createFish = authorityService.getByName(AuthorityEnum.CREATE_FISH.toString())
                .orElseThrow(() -> new RuntimeException("CREATE_FISH authority not found"));

        Authority updateFish = authorityService.getByName(AuthorityEnum.UPDATE_FISH.toString())
                .orElseThrow(() -> new RuntimeException("UPDATE_FISH authority not found"));

        Authority deleteFish = authorityService.getByName(AuthorityEnum.DELETE_FISH.toString())
                .orElseThrow(() -> new RuntimeException("DELETE_FISH authority not found"));

        // COMPETITION AUTHORITY
        Authority viewCompetitions = authorityService.getByName(AuthorityEnum.VIEW_COMPETITIONS.toString())
                .orElseThrow(() -> new RuntimeException("VIEW_COMPETITIONS authority not found"));

        Authority viewUpcomingCompetitions = authorityService.getByName(AuthorityEnum.VIEW_UPCOMING_COMPETITIONS.toString())
                .orElseThrow(() -> new RuntimeException("VIEW_UPCOMING_COMPETITIONS authority not found"));

        Authority viewMyCompetitions = authorityService.getByName(AuthorityEnum.VIEW_MY_COMPETITIONS.toString())
                .orElseThrow(() -> new RuntimeException("VIEW_MY_COMPETITIONS authority not found"));

        Authority viewOneCompetition = authorityService.getByName(AuthorityEnum.VIEW_ONE_COMPETITION.toString())
                .orElseThrow(() -> new RuntimeException("VIEW_ONE_COMPETITION authority not found"));

        Authority createCompetition = authorityService.getByName(AuthorityEnum.CREATE_COMPETITION.toString())
                .orElseThrow(() -> new RuntimeException("CREATE_COMPETITION authority not found"));

        Authority deleteCompetition = authorityService.getByName(AuthorityEnum.DELETE_COMPETITION.toString())
                .orElseThrow(() -> new RuntimeException("DELETE_COMPETITION authority not found"));

        // RANKING AUTHORITY
        Authority viewRankingByMemberAndCompetition = authorityService.getByName(AuthorityEnum.VIEW_RANKING_BY_MEMBER_AND_COMPETITION.toString())
                .orElseThrow(() -> new RuntimeException("VIEW_RANKING_BY_MEMBER_AND_COMPETITION authority not found"));

        Authority updateRankingByMemberAndCompetition = authorityService.getByName(AuthorityEnum.UPDATE_RANKING_BY_MEMBER_AND_COMPETITION.toString())
                .orElseThrow(() -> new RuntimeException("UPDATE_RANKING_BY_MEMBER_AND_COMPETITION authority not found"));

        Authority registerMemberToCompetition = authorityService.getByName(AuthorityEnum.REGISTER_MEMBER_TO_COMPETITION.toString())
                .orElseThrow(() -> new RuntimeException("REGISTER_MEMBER_TO_COMPETITION authority not found"));

        Authority viewTop3 = authorityService.getByName(AuthorityEnum.VIEW_TOP_3.toString())
                .orElseThrow(() -> new RuntimeException("VIEW_TOP_3 authority not found"));

        // HUNTING AUTHORITY
        Authority viewHuntingByCompetition = authorityService.getByName(AuthorityEnum.VIEW_HUNTING_BY_COMPETITION.toString())
                .orElseThrow(() -> new RuntimeException("VIEW_HUNTING_BY_COMPETITION authority not found"));

        Authority viewHuntingByCompetitionAndMember = authorityService.getByName(AuthorityEnum.VIEW_HUNTING_BY_COMPETITION_AND_MEMBER.toString())
                .orElseThrow(() -> new RuntimeException("VIEW_HUNTING_BY_COMPETITION_AND_MEMBER authority not found"));

        Authority viewOneHunting = authorityService.getByName(AuthorityEnum.VIEW_ONE_HUNTING.toString())
                .orElseThrow(() -> new RuntimeException("VIEW_ONE_HUNTING authority not found"));

        Authority createHunting = authorityService.getByName(AuthorityEnum.CREATE_HUNTING.toString())
                .orElseThrow(() -> new RuntimeException("CREATE_HUNTING authority not found"));

        Authority deleteHunting = authorityService.getByName(AuthorityEnum.DELETE_HUNTING.toString())
                .orElseThrow(() -> new RuntimeException("DELETE_HUNTING authority not found"));

        Authority updateHunting = authorityService.getByName(AuthorityEnum.UPDATE_HUNTING.toString())
                .orElseThrow(() -> new RuntimeException("UPDATE_HUNTING authority not found"));




        // Create roles and associate authorities
        Role memberRole = Role.builder()
                .name("ROLE_MEMBER")
                .authorities(Arrays.asList(viewCompetitions, viewMyCompetitions, viewTop3))
                .isDefault(true)
                .build();

        Role juryRole = Role.builder()
                .name("ROLE_JURY")
                .authorities(Arrays.asList(
                        viewLevels, viewOneLevel, createLevel, updateLevel, deleteLevel,
                        viewFishes, viewOneFish, createFish, updateFish, deleteFish,
                        viewCompetitions, viewUpcomingCompetitions, viewOneCompetition, viewOneCompetition, createCompetition, deleteCompetition,
                        viewRankingByMemberAndCompetition, updateRankingByMemberAndCompetition, registerMemberToCompetition, viewTop3,
                        viewHuntingByCompetition, viewHuntingByCompetitionAndMember, viewOneHunting, createHunting, deleteHunting, updateHunting
                        ))
                .build();

        Role managerRole = Role.builder()
                .name("ROLE_MANAGER")
                .authorities(authorityRepository.findAll())
                .build();

        roleService.save(memberRole, true);
        roleService.save(juryRole, true);
        roleService.save(managerRole, true);
    }

}
