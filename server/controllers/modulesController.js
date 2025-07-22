// This is placeholder logic, you can later pull modules from DB or JSON

export const getAllModules = async (req, res) => {
    try {
      const modules = [
        "SAST",
        "SCA",
        "IaC",
        "Container",
        "DAST",
        "SBOM"
      ];
      res.status(200).json(modules);
    } catch (err) {
      res.status(500).json({ error: 'Server error while fetching modules' });
    }
  };
  
  export const addModule = async (req, res) => {
    // Add module to DB in future if required
    res.status(200).json({ message: 'Module added (not persisted in this version)' });
  };
  