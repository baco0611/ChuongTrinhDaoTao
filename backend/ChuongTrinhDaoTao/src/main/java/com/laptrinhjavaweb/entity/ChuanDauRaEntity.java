package com.laptrinhjavaweb.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name= "ChuanDauRa")
@Data

public class ChuanDauRaEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idChuanDauRa;
	
	@Column
	private String kiHieu;
	
	@Column(columnDefinition = "TEXT")
	private String noiDung;
	
	@Column
	private String loaiChuanDauRa;
	
	@Column(length = 500)
	private String loaiChuanDauRaChiTiet;

	@Column
	private int trinhDoNangLuc;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="idChuongTrinh")
	private ChuongTrinhDaoTaoEntity idChuongTrinh;
	
	@OneToMany(mappedBy = "idChuanDauRa")
	private List<MaTran_ChuanDauRa_MucTieuEntity> lstMucTieu= new ArrayList<MaTran_ChuanDauRa_MucTieuEntity>();
	
	@OneToMany(mappedBy = "idChuanDauRa")
	private List<MaTran_HocPhan_ChuanDauRaEntity> lstHocPhan= new ArrayList<MaTran_HocPhan_ChuanDauRaEntity>();

	@OneToMany(mappedBy = "idChuanDauRa")
	private List<MaTran_ChungChi_ChuanDauRaEntity> lstChungChi = new ArrayList<MaTran_ChungChi_ChuanDauRaEntity>();
}
