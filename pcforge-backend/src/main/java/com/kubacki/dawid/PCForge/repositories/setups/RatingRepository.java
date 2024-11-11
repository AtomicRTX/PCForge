package com.kubacki.dawid.PCForge.repositories.setups;

import com.kubacki.dawid.PCForge.models.setups.RatingSetup;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RatingRepository extends JpaRepository<RatingSetup, Integer> {

}
