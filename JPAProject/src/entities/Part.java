package entities;
import java.util.List;

//test
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

@Entity
public class Part {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	private double cost;
	@Column(name="serial_number")
	private String serialNumber;
	private String name;
	@ManyToMany(mappedBy="parts")
	private List<Request> requests; 
	@ManyToMany(mappedBy="parts")
	private List<Quote> quotes; 

	public double getCost() {
		return cost;
	}

	public void setCost(double cost) {
		this.cost = cost;
	}

	public String getSerialNumber() {
		return serialNumber;
	}

	public void setSerialNumber(String serialNumber) {
		this.serialNumber = serialNumber;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getId() {
		return id;
	}

	@Override
	public String toString() {
		return "Part [id=" + id + ", cost=" + cost + ", serialNumber=" + serialNumber + ", name=" + name + "]";
	}
}
	
