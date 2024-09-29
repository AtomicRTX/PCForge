package com.kubacki.dawid.PCForge.repositories;

import com.kubacki.dawid.PCForge.models.setups.ComputerSetup;
import com.kubacki.dawid.PCForge.models.setups.SavedSetup;
import com.kubacki.dawid.PCForge.models.users.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SavedRepository extends JpaRepository<SavedSetup, Integer> {
    default SavedSetup findByUserAndComputerSetup(User user, ComputerSetup computerSetup) {
        return null;
    }
    @Query
    boolean existsByUserAndComputerSetup(User user, ComputerSetup computerSetup);
}
