package entities;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
@Entity
public class Business {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	private Contact contact;
	private String specialty; 
	private double rating;
	private double laborRate;
	private String companyName;
	private int experience;
	private String website;
	private List<Certification> certifications;
}
