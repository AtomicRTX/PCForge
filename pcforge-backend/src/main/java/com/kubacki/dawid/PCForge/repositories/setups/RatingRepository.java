package com.kubacki.dawid.PCForge.repositories.setups;

import com.kubacki.dawid.PCForge.models.setups.ComputerSetup;
import com.kubacki.dawid.PCForge.models.setups.RatingSetup;
import com.kubacki.dawid.PCForge.models.users.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RatingRepository extends JpaRepository<RatingSetup, Integer> {

    @Query("SELECT rs.rating FROM RatingSetup rs WHERE rs.computerSetup.cs_id = :computer_setup")
    List<Double> findRatingByComputerSetup(@Param("computer_setup") Integer cs_id);

    @Query("SELECT COALESCE(MAX(rs.rating), 0) FROM RatingSetup rs WHERE rs.computerSetup = :computer_setup AND rs.user = :user")
    Double findRatingByUserAndComputerSetup(@Param("user") User user, @Param("computer_setup") ComputerSetup computerSetup);

    boolean existsByUserAndComputerSetup(User user, ComputerSetup computerSetup);
    RatingSetup findByUserAndComputerSetup(User user, ComputerSetup computerSetup);
}
