package com.laptrinhjavaweb.entity;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name="maTranChuanDauRaMucTieu")
@Data
public class MaTran_ChuanDauRa_MucTieuEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idMaTran;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="idChuanDauRa")
	private ChuanDauRaEntity idChuanDauRa;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="idMucTieu")
	private MucTieuCuTheEntity idMucTieu;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="idChuongTrinh")
	private ChuongTrinhDaoTaoEntity idChuongTrinh;
	
}
