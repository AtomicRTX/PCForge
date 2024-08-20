package com.kubacki.dawid.PCForge.models.setups;

import com.kubacki.dawid.PCForge.models.users.User;
import jakarta.persistence.*;

@Entity
@Table(name = "UserSetup")

public class UserSetup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int us_id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name="cs_id", nullable=false)
    private ComputerSetup computerSetup;
}
