package com.kubacki.dawid.PCForge.repositories.setups;

import com.kubacki.dawid.PCForge.models.setups.RatingSetup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RatingRepository extends JpaRepository<RatingSetup, Integer> {

    @Query("SELECT rs.rating FROM RatingSetup rs WHERE rs.computerSetup.cs_id = :computer_setup")
    List<Double> findRatingByComputerSetup(@Param("computer_setup") Integer cs_id);
}
