package com.kubacki.dawid.PCForge.models.setups;

import com.kubacki.dawid.PCForge.models.users.User;
import jakarta.persistence.*;
import lombok.Setter;

@Entity
@Setter
@Table(name = "RatingSetup")

public class RatingSetup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int rating_id;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name="cs_id", nullable=false)
    private ComputerSetup computerSetup;

    @Column(nullable = false)
    private Double rating;
}
