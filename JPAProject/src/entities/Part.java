package entities;
//test
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class Part {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	private double cost;
	@Column(name="serial_number")
	private String serialNumber;
	private String name;
	@ManyToOne
	private PartRequest partsRequest;
}
