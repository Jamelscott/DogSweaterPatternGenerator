import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

const requiredNeedleCircumference = (Cn, Cch) => {
  // tbd
};

const requiredNeedleLength = () => {
  // tbd
};

const n_stitchesToCastOnInitially = (Cn, neck_allowance, st_scale) => {
  const total_neckCirc = Cn + neck_allowance; // measured neck length + breathing room (cm)

  let sts_neck = Math.round(total_neckCirc * st_scale, 0); // number of stitches to cast on initially

  if (sts_neck % 2) {
    // ensure that the number of neck stitches is even
    sts_neck += 1;
  }

  return sts_neck;
};

const rateOfStitchIncreasesOverChestArea = (
  Cn,
  neck_allowance,
  Lch,
  neckToChest_allowance,
  r_scale,
  Cch,
  chest_allowance,
  st_scale
) => {
  const total_neckCirc = Cn + neck_allowance;
  const sts_neck = Math.round(total_neckCirc * st_scale, 0);
  const total_chestLength = Lch + neckToChest_allowance;
  const rows_toChest = total_chestLength * r_scale; // number of rows to knit until reaching the chest length
  const total_chestCirc = Cch + chest_allowance; // measured chest length + breathing room (cm)
  const sts_chest = total_chestCirc * st_scale; // number of stitches reached at the chest length
  const sts_rate = (sts_chest - sts_neck) / rows_toChest; // rate at which stitches should be increased per row

  return sts_rate;

  // sts_setRates = [4, 2, 1 , 0.5, 2/6]

  // frac = 1

  // sts_candidateRates = [x for x in sts_setRates if (x>(sts_rate))]  # only consider increase rates larger than calculated; might have to do a little extra thinking here (ex. 0.55 should map to 0.5 rather than 1)

  // sts_closestRate = min(sts_candidateRates, key=lambda x:(x-sts_rate))  # get the closest rate out of a list of set rates.

  // #print(sts_candidateRates)

  // #print(sts_rate, sts_closestRate)
};

function App() {
  // user inputs
  const [form, setForm] = useState({
    n_stitches: "", // number of stitches per row
    n_rows: "", // number of rows, exluding cast-on and cast-off rows
    width: "", // width of swatch (cm); measured parrallel to rows
    length: "", // length of swatch (cm); measured perpendicular to rows
    needle_size: "", // size of needles (mm) used to knit the swatch
    Cn: "", // Neck circumference (cm)
    Cch: "", // Chest circumference (cm)
    Cl: "", // Front leg circumference (cm)
    Lch: "", // Neck-to-Chest Length (cm); measured along chest
    Ll: "", // Neck-to-Legs Length (cm); measured along chest
    Lh: "", // Neck-to-Hips Length (cm); measured along back
    Lp: "", // Neck-to-Peen Length (cm); measured along chest and belly
    d: "", // Distance between front legs (cm)
  });

  // results to display
  const [results, setResults] = useState({
    x: null,
  });

  // start of constants
  // standard circular knitting needle lengths
  const kn_lengths = [40, 60, 74, 91]; // length of standard knitting needles available (cm)

  // from gauge swatch
  const neckAllowance = 20; // in centimeters
  const st_scale = form.n_stitches / form.width; // stitch scale factor (converts from measurements to stitches) (st/cm)
  const r_scale = form.n_rows / form.length; // row scale factor (converts from mreasuremetns to rows) (row/cm)

  // specify additional ease/allowances
  const neck_allowance = 2.54; // (cm)
  const chest_allowance = 2.54; // (cm)
  const neckToChest_allowance = 0; // (cm)
  const neckToLegs_allowance = 2.54; // (cm)
  const neckToHips_allowance = 0; // (cm)
  const neckToPeen_allowance = 0; // (cm)
  const betweenLegs_allowance = -2.54; // (cm)
  const legCirc_allowance = 0; // (cm)
  // end of constants

  const handleTextChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      "Stitches to cast Initially: ",
      n_stitchesToCastOnInitially(form.Cn, neck_allowance, st_scale)
    );
    console.log(
      "rate of Stitch Increases over chest area: ",
      rateOfStitchIncreasesOverChestArea(
        form.Cn,
        neck_allowance,
        form.Lch,
        neckToChest_allowance,
        r_scale,
        form.Cch,
        chest_allowance,
        st_scale
      )
    );
  };

  const handleExampleData = (e) => {
    e.preventDefault();
    setForm({
      ...form,
      n_stitches: 20, // number of stitches per row
      n_rows: 10, // number of rows, exluding cast-on and cast-off rows
      width: 15, // width of swatch (cm); measured parrallel to rows
      length: 6.5, // length of swatch (cm); measured perpendicular to rows
      needle_size: 9, // size of needles (mm) used to knit the swatch
      Cn: 40, // Neck circumference (cm)
      Cch: 61, // Chest circumference (cm)
      Cl: 19, // Front leg circumference (cm)
      Lch: 29, // Neck-to-Chest Length (cm); measured along chest
      Ll: 22, // Neck-to-Legs Length (cm); measured along chest
      Lh: 45, // Neck-to-Hips Length (cm); measured along back
      Lp: 41, // Neck-to-Peen Length (cm); measured along chest and belly
      d: 12, // Distance between front legs (cm)
    });
  };
  return (
    <div className="App">
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2>Dog Sweater Knitting Pattern Generator</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            alignItems: "center",
          }}
        >
          <h3>Gauge Swatches</h3>
          <div>
            <label>Number of stitches per row: </label>
            <input
              name="n_stitches"
              onChange={handleTextChange}
              value={form.n_stitches}
              type="text"
            ></input>
          </div>
          <div>
            <label>number of rows, exluding cast-on and cast-off rows: </label>
            <input
              name="n_rows"
              onChange={handleTextChange}
              value={form.n_rows}
              type="text"
            ></input>
          </div>
          <div>
            <label>
              width of swatch (cm); measured perpendicular to rows :{" "}
            </label>
            <input
              name="width"
              onChange={handleTextChange}
              value={form.width}
              type="text"
            ></input>
          </div>
          <div>
            <label>
              length of swatch (cm); measured perpendicular to rows :{" "}
            </label>
            <input
              name="length"
              onChange={handleTextChange}
              value={form.length}
              type="text"
            ></input>
          </div>
          <div>
            <label>size of needles (mm) used to knit the swatch: </label>
            <input
              name="needle_size"
              onChange={handleTextChange}
              value={form.needle_size}
              type="text"
            ></input>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            alignItems: "center",
          }}
        >
          <h3>Dog measurements</h3>
          <div>
            <label>Neck circumference (cm): </label>
            <input
              name="Cn"
              onChange={handleTextChange}
              value={form.Cn}
              type="text"
            ></input>
          </div>
          <div>
            <label>Chest circumference (cm): </label>
            <input
              name="Cch"
              onChange={handleTextChange}
              value={form.Cch}
              type="text"
            ></input>
          </div>
          <div>
            <label>Front leg circumference (cm): </label>
            <input
              name="Cl"
              onChange={handleTextChange}
              value={form.Cl}
              type="text"
            ></input>
          </div>
          <div>
            <label> Neck-to-Chest Length (cm); measured along chest: </label>
            <input
              name="Lch"
              onChange={handleTextChange}
              value={form.Lch}
              type="text"
            ></input>
          </div>
          <div>
            <label> Neck-to-Legs Length (cm); measured along chest : </label>
            <input
              name="Ll"
              onChange={handleTextChange}
              value={form.Ll}
              type="text"
            ></input>
          </div>
          <div>
            <label> Neck-to-Hips Length (cm); measured along back: </label>
            <input
              name="Lh"
              onChange={handleTextChange}
              value={form.Lh}
              type="text"
            ></input>
          </div>
          <div>
            <label>
              {" "}
              Neck-to-Peen Length (cm); measured along chest and belly:{" "}
            </label>
            <input
              name="Lp"
              onChange={handleTextChange}
              value={form.Lp}
              type="text"
            ></input>
          </div>
          <div>
            <label> Distance between front legs (cm): </label>
            <input
              name="d"
              onChange={handleTextChange}
              value={form.d}
              type="text"
            ></input>
          </div>
        </div>
        <input
          style={{ width: "100px", height: "50px", marginTop: "20px" }}
          type="submit"
          onClick={handleExampleData}
          value="input test data"
        ></input>
        <input
          style={{ width: "100px", height: "50px", marginTop: "20px" }}
          type="submit"
          onClick={handleSubmit}
        ></input>
      </form>

      <h2>Results</h2>
    </div>
  );
}

export default App;
