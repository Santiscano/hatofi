"use client";

import { useEffect, useState, type FormEvent } from "react";

export interface Bovine {
  id: string;
  tag: string;
  rfid: string;
  breed: string;
  stage: string;
  initialWeight: number;
  currentWeight: number;
  gainNet: number;
  gainBiweekly: number;
  health: string;
}

type CattleFilter = "all" | "optimal" | "review";

const initialCattle: Bovine[] = [
  {
    id: "01",
    tag: "#ICA-001",
    rfid: "982.000.412.981",
    breed: "Brahman x Angus",
    stage: "24 meses • Mes 8 de 10",
    initialWeight: 210,
    currentWeight: 486.4,
    gainNet: 276.4,
    gainBiweekly: 14.2,
    health: "Vacunado / Óptimo",
  },
  {
    id: "02",
    tag: "#ICA-002",
    rfid: "982.000.412.982",
    breed: "Nelore Comercial",
    stage: "23 meses • Mes 8 de 10",
    initialWeight: 205,
    currentWeight: 478.0,
    gainNet: 273.0,
    gainBiweekly: 12.8,
    health: "Vacunado / Óptimo",
  },
  {
    id: "03",
    tag: "#ICA-003",
    rfid: "982.000.412.983",
    breed: "Brahman Puro",
    stage: "25 meses • Mes 8 de 10",
    initialWeight: 220,
    currentWeight: 492.5,
    gainNet: 272.5,
    gainBiweekly: 15.5,
    health: "Vacunado / Óptimo",
  },
  {
    id: "04",
    tag: "#ICA-004",
    rfid: "982.000.412.984",
    breed: "Brangus Colorado",
    stage: "24 meses • Mes 8 de 10",
    initialWeight: 215,
    currentWeight: 489.1,
    gainNet: 274.1,
    gainBiweekly: 13.6,
    health: "Vacunado / Óptimo",
  },
];

export function useMyFarm() {
  const [cattleList, setCattleList] = useState<Bovine[]>(initialCattle);
  const [selectedFilter, setSelectedFilter] = useState<CattleFilter>("all");
  const [weightModalOpen, setWeightModalOpen] = useState(false);
  const [selectedBovine, setSelectedBovine] = useState<Bovine | null>(null);
  const [newWeightInput, setNewWeightInput] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [newBatchModalOpen, setNewBatchModalOpen] = useState(false);
  const [addBovineModalOpen, setAddBovineModalOpen] = useState(false);
  const [newTag, setNewTag] = useState("#ICA-005");
  const [newBreed, setNewBreed] = useState("Brahman x Simmental");
  const [newWeight, setNewWeight] = useState("225");

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(""), 4000);
  };

  const filteredCattle = cattleList.filter((bovine) => {
    if (selectedFilter === "optimal") return bovine.currentWeight >= 480;
    if (selectedFilter === "review") return bovine.currentWeight < 480;
    return true;
  });

  const handleOpenWeightModal = (bovine: Bovine) => {
    setSelectedBovine(bovine);
    setNewWeightInput((bovine.currentWeight + 2.5).toFixed(1));
    setWeightModalOpen(true);
  };

  const handleSaveWeight = (event: FormEvent) => {
    event.preventDefault();
    if (!selectedBovine) return;
    const value = parseFloat(newWeightInput);
    if (isNaN(value) || value <= 0) return;

    setCattleList((previousCattle) =>
      previousCattle.map((bovine) => {
        if (bovine.id === selectedBovine.id) {
          const difference = value - bovine.currentWeight;
          return {
            ...bovine,
            currentWeight: value,
            gainNet: parseFloat((bovine.gainNet + difference).toFixed(1)),
            gainBiweekly: parseFloat((bovine.gainBiweekly + difference).toFixed(1)),
          };
        }
        return bovine;
      }),
    );

    setWeightModalOpen(false);
    showToast(`✓ Pesaje telemétrico registrado para ${selectedBovine.tag}: ${value} kg.`);
  };

  const handleAddBovine = (event: FormEvent) => {
    event.preventDefault();
    const weight = parseFloat(newWeight) || 220;
    const newBovine: Bovine = {
      id: String(cattleList.length + 1).padStart(2, "0"),
      tag: newTag,
      rfid: `982.000.412.98${cattleList.length + 5}`,
      breed: newBreed,
      stage: "22 meses • Mes 1 de 10",
      initialWeight: weight,
      currentWeight: weight,
      gainNet: 0,
      gainBiweekly: 0,
      health: "Vacunado / Óptimo",
    };
    setCattleList([...cattleList, newBovine]);
    setAddBovineModalOpen(false);
    showToast(`✓ Bovino ${newTag} incorporado con arete RFID a la manga.`);
  };

  useEffect(() => {
    const handleDownloadCert = () =>
      showToast("Descargando Certificado Oficial ICA SIGMA #84920-CO en PDF...");
    const handleNewBatch = () => setNewBatchModalOpen(true);

    window.addEventListener("download-ica-cert", handleDownloadCert);
    window.addEventListener("open-new-batch-modal", handleNewBatch);

    return () => {
      window.removeEventListener("download-ica-cert", handleDownloadCert);
      window.removeEventListener("open-new-batch-modal", handleNewBatch);
    };
  }, []);

  return {
    cattleList,
    selectedFilter,
    setSelectedFilter,
    weightModalOpen,
    setWeightModalOpen,
    selectedBovine,
    newWeightInput,
    setNewWeightInput,
    toastMessage,
    setToastMessage,
    newBatchModalOpen,
    setNewBatchModalOpen,
    addBovineModalOpen,
    setAddBovineModalOpen,
    newTag,
    setNewTag,
    newBreed,
    setNewBreed,
    newWeight,
    setNewWeight,
    filteredCattle,
    showToast,
    handleOpenWeightModal,
    handleSaveWeight,
    handleAddBovine,
  };
}
