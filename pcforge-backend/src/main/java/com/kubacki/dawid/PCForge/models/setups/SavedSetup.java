package com.kubacki.dawid.PCForge.models.setups;

import com.kubacki.dawid.PCForge.models.users.User;
import jakarta.persistence.*;
import lombok.Setter;

@Entity
@Setter
@Table(name = "SavedSetup")

public class SavedSetup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int saved_id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name="cs_id", nullable=false)
    private ComputerSetup computerSetup;
}
