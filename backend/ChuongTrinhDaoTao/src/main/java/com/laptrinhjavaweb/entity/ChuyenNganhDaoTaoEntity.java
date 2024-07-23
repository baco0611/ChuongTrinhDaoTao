package com.laptrinhjavaweb.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;

import lombok.Data;

@Entity
@Table(name="ChuyenNganhDaoTao")
@Data
public class ChuyenNganhDaoTaoEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idChuyenNganh;
	
	@Column
	private String tenChuyenNganh;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="idChuongTrinh")
	private ChuongTrinhDaoTaoEntity idChuongTrinh;
		
	@OneToMany(mappedBy = "idChuyenNganh")
	private List<ChuongTrinhChiTietEntity> lstChuongTrinhChiTiet = new ArrayList<ChuongTrinhChiTietEntity>();
}

