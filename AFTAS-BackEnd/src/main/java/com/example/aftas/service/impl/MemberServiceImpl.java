package com.example.aftas.service.impl;

import com.example.aftas.config.handlers.exception.CustomException;
import com.example.aftas.dto.response.NotVerifiedMembersResponseDTO;
import com.example.aftas.model.Member;
import com.example.aftas.model.Role;
import com.example.aftas.repository.MemberRepository;
import com.example.aftas.repository.RoleRepository;
import com.example.aftas.service.MemberService;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class MemberServiceImpl implements MemberService {
    private final MemberRepository memberRepository;
    private final RoleRepository roleRepository;


    public MemberServiceImpl(MemberRepository memberRepository, RoleRepository roleRepository) {
        this.memberRepository = memberRepository;
        this.roleRepository = roleRepository;
    }
    @Override
    public Member getMemberById(Long id) {
        return memberRepository.findById(id).orElseThrow(() -> new RuntimeException("Member with id " + id + " not found"));
    }

    @Override
    public List<Member> getAllMembers() {
        return memberRepository.findAll();
    }

    @Override
    public Member addMember(Member member) {

        if (memberRepository.existsByIdentityNumber(member.getIdentityNumber())) {
            throw new RuntimeException("IdentityNumber already exists");
        }

        member.setAccessDate(java.time.LocalDate.now());

        // Generate a random membership number and check for uniqueness
        int randomMembershipNumber;
        do {
            randomMembershipNumber = generateRandomMembershipNumber();
        } while (memberRepository.existsByMembershipNumber(randomMembershipNumber));

        member.setMembershipNumber(randomMembershipNumber);
        return memberRepository.save(member);
    }

    @Override
    public List<Member> findByMembershipNumberOrIdentityNumberOrNameOrFamilyName(String searchTerm) {
        return memberRepository.findByMembershipNumberOrIdentityNumberOrNameOrFamilyName(searchTerm);
    }

    @Override
    public Member updateMember(Member member, Long id) {

        if (memberRepository.existsByIdentityNumber(member.getIdentityNumber())) {
            throw new RuntimeException("IdentityNumber already exists");
        }

        Member existingMember = getMemberById(id);
        existingMember.setName(member.getName());
        existingMember.setFamilyName(member.getFamilyName());
        existingMember.setNationality(member.getNationality());
        existingMember.setIdentityDocumentType(member.getIdentityDocumentType());
        existingMember.setIdentityNumber(member.getIdentityNumber());
        return memberRepository.save(existingMember);
    }

    @Override
    public void deleteMember(Long id) {
        memberRepository.deleteById(id);
    }

    @Override
    public List<Member> getMembersByCompetitionId(Long competitionId) {
        // Implement the logic to fetch members by competition ID
        return memberRepository.findMembersByCompetitionId(competitionId);
    }

    private int generateRandomMembershipNumber() {
        Random random = new Random();
        return random.nextInt(1000000) + 1;
    }

    //Security
    @Override
    public Role grantRoleToUser(Long userId, Long roleId) {
        List<String> authorities = SecurityContextHolder.getContext().getAuthentication().getAuthorities().stream().map(GrantedAuthority::getAuthority).toList();
        if (authorities.contains("ASSIGN_ROLE_TO_USER")) {
            Role role = roleRepository.findById(roleId).orElse(null);
            Member user = memberRepository.findById(userId).orElse(null);
            if (role != null && user != null) {
                user.setRole(role);
                memberRepository.save(user);
                return role;
            }
            throw new CustomException("Role or user not found", HttpStatus.NOT_FOUND);
        }throw new CustomException("Insufficient authorities", HttpStatus.UNAUTHORIZED);
    }

    @Override
    public Optional<Member> getById(Long id) {
        return Optional.empty();
    }



    @Override
    public Member enableMemberAccount(Long memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new IllegalArgumentException("Member with id " + memberId + " not found"));
        if (member.getIsVerified()) {
            throw new IllegalArgumentException("Member already validated");
        }
        member.setIsVerified(true);
        return memberRepository.save(member);
    }


    @Override
    public List<NotVerifiedMembersResponseDTO> getAllMembersNotVerified() {
        List<Member> notVerifiedMembers = memberRepository.findAllByIsVerified(false);
        return notVerifiedMembers.stream()
                .map(member -> NotVerifiedMembersResponseDTO.builder()
                        .id(member.getId())
                        .name(member.getName())
                        .familyName(member.getFamilyName())
                        .email(member.getEmail())
                        .isVerified(member.getIsVerified())
                        .build())
                .collect(Collectors.toList());
    }
}
