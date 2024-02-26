package com.example.aftas.service;

import com.example.aftas.model.Member;
import com.example.aftas.model.Role;

import java.util.List;
import java.util.Optional;

public interface MemberService {
    Member getMemberById(Long id);
    List<Member> getAllMembers();
    Member addMember(Member member);
    List<Member> findByMembershipNumberOrIdentityNumberOrNameOrFamilyName(String searchTerm);
    Member updateMember(Member member, Long id);
    void deleteMember(Long id);
    List<Member> getMembersByCompetitionId(Long competitionId);

    Optional<Member> getById(Long id);

    Role grantRoleToUser(Long userId, Long roleId);

    Member enableMemberAccount(Long memberId);
}
