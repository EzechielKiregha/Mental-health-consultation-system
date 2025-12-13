package com.group1.support.mental_health_consultation_sys.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = true)
    private String avatarUrl;

    @Column(nullable = false)
    private String password;

    @Column(nullable = true)
    private boolean enabled;

    @Column(nullable = true)
    private String phoneNumber;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "users_roles",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles = new HashSet<>();

    private List<Long> roleIds;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("user-appointments") // Unique value
    private List<Appointment> appointments;

    @OneToMany(mappedBy = "therapist")
    @JsonManagedReference("therapist-appointments") // Unique value
    private List<Appointment> therapistAppointments;

    @OneToMany(mappedBy = "therapist")
    @JsonManagedReference("therapist-resources") // Unique value
    private List<MentalHealthResource> uploadedResources;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("user-therapist-profile") // Unique value
    private TherapistProfile therapistProfile;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("user-self-check-result") // Unique value
    private SelfCheckResult selfCheckResult;

    @Column(nullable = true)
    private Integer otpString;

    @ManyToMany
    @JoinTable(
            name = "user_resources",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "resource_id")
    )
    private List<MentalHealthResource> savedResources;
    

    public User() {
        this.enabled = true;
    }

    public User(String firstName, String lastName, String email, String password, Set<Role> roles) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.roles = roles;
    }

    public static User fromEntity(User user) {
        // Assuming a simple copy constructor logic
        User newUser = new User();
        // Copy fields from the input user to the new user
        // Example: newUser.setField(user.getField());
        return newUser;
    }
}



