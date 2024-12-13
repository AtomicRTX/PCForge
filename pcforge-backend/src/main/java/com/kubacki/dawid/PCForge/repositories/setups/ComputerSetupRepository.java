package com.kubacki.dawid.PCForge.repositories.setups;

import com.kubacki.dawid.PCForge.models.setups.ComputerSetup;
import com.kubacki.dawid.PCForge.models.users.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ComputerSetupRepository extends JpaRepository<ComputerSetup, Integer> {

    @Query("SELECT cs FROM ComputerSetup cs")
    List<ComputerSetup> getComputerSetups();

    @Query("""
            SELECT cs FROM ComputerSetup cs 
            WHERE (
                (CASE WHEN cs.cpu.cpu_id = :cpu_id THEN 1 ELSE 0 END) +
                (CASE WHEN cs.gpu.gpu_id = :gpu_id THEN 1 ELSE 0 END) +
                (CASE WHEN cs.mem.ram_id = :ram_id THEN 1 ELSE 0 END) +
                (CASE WHEN cs.motherboard.mb_id = :motherboard_id THEN 1 ELSE 0 END) +
                (CASE WHEN cs.power.power_id = :power_id THEN 1 ELSE 0 END) +
                (CASE WHEN cs.cs.case_id = :case_id THEN 1 ELSE 0 END) +
                (CASE WHEN cs.storage.st_id = :st_id THEN 1 ELSE 0 END) ) >= 3""")
    List<ComputerSetup> getSimilarComputerSetups(@Param("cpu_id") Integer cpu_id,
                                                 @Param("gpu_id") Integer gpu_id,
                                                 @Param("ram_id") Integer ram_id,
                                                 @Param("motherboard_id") Integer motherboard_id,
                                                 @Param("power_id") Integer power_id,
                                                 @Param("case_id") Integer case_id,
                                                 @Param("st_id") Integer st_id);

    void deleteComputerSetupByUser(User user);
}
