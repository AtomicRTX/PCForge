package com.kubacki.dawid.PCForge.mapper;

import com.kubacki.dawid.PCForge.dto.ComputerSetupRequest;
import com.kubacki.dawid.PCForge.models.setups.ComputerSetup;

public class ComputerSetupMapper {
    public static ComputerSetupRequest mapToComputerSetupRequest(ComputerSetup computerSetup) {
        return new ComputerSetupRequest(
                computerSetup.getCs_id(),
                computerSetup.getUser().getUser_id(),
                computerSetup.getCs().getCase_id(),
                computerSetup.getCpu().getCpu_id(),
                computerSetup.getGpu().getGpu_id(),
                computerSetup.getMem().getRam_id(),
                computerSetup.getMotherboard().getMb_id(),
                computerSetup.getPower().getPower_id(),
                computerSetup.getStorage().getSt_id()
        );
    }
}
