package com.laptrinhjavaweb.entity;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import com.laptrinhjavaweb.converter.RolesConverter;
import com.laptrinhjavaweb.dataEnum.Role;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
// Các import khác

@Entity
@Table(name = "Lecturers")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LecturersEntity implements UserDetails {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long lecturersId;

	private String lecturersCode;

	@Column(columnDefinition = "nvarchar(255)")
	private String firstName;

	@Column(columnDefinition = "nvarchar(255)")
	private String lastName;

	private String email;

	private String password;

	@Column(name = "department_manager", nullable = true, columnDefinition = "TINYINT DEFAULT 0")
	private Boolean departmentManager = false;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "departmentId")
	private DepartmentEntity department;

	@OneToMany(mappedBy = "lecturer")
	private List<EducationProgramEntity> educationPrograms = new ArrayList<>();

	@Lob
	@Convert(converter = RolesConverter.class)
	private List<Role> roles = new ArrayList<>(); // Khởi tạo với danh sách rỗng

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return roles.stream().map(role -> new SimpleGrantedAuthority(role.name())).collect(Collectors.toList());
	}

	@Override
	public String getUsername() {
		return lecturersCode;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	@Override
	public String getPassword() {
		return password;
	}
}
