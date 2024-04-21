package com.laptrinhjavaweb.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table (name = "mucTieuCuThe")
@Data
public class MucTieuCuTheEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idMucTieu;
	
	@Column(length = 50)
	private String kiHieu;
	
	@Column(columnDefinition = "TEXT")
	private String noiDung;
	
	@Column
	private String loaiMucTieu;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="idChuongTrinh")
	private ChuongTrinhDaoTaoEntity idChuongTrinh;
	
	@OneToMany(mappedBy = "idMucTieu")
	private List<MaTran_ChuanDauRa_MucTieuEntity> lstChuanDauRa = new ArrayList<MaTran_ChuanDauRa_MucTieuEntity>();
}
