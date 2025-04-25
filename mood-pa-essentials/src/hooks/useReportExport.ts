import { FC, useState } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { useRef } from 'react';

interface UseReportExportProps {
  reportRef: React.RefObject<HTMLDivElement>;
  projectName: string;
}

const useReportExport = ({ reportRef, projectName }: UseReportExportProps) => {
  const [isExporting, setIsExporting] = useState(false);
  
  // Função para exportar o relatório como PDF
  const exportToPDF = async () => {
    if (!reportRef.current) return;
    
    try {
      setIsExporting(true);
      
      // Configurar o documento PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      // Capturar o conteúdo do relatório como imagem
      const canvas = await html2canvas(reportRef.current, {
        scale: 2, // Melhor qualidade
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      let position = 0;
      
      // Adicionar a imagem ao PDF
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      
      // Se o relatório for maior que uma página A4, adicionar mais páginas
      const pageHeight = 295; // A4 height in mm
      
      while (position < imgHeight) {
        position += pageHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, -position, imgWidth, imgHeight);
      }
      
      // Salvar o PDF
      const fileName = `${projectName.replace(/\s+/g, '_')}_Relatorio_MOOD_PA.pdf`;
      pdf.save(fileName);
      
    } catch (error) {
      console.error('Erro ao exportar PDF:', error);
    } finally {
      setIsExporting(false);
    }
  };
  
  // Função para imprimir o relatório
  const printReport = () => {
    if (!reportRef.current) return;
    
    try {
      const printWindow = window.open('', '_blank');
      if (!printWindow) return;
      
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Relatório MOOD.PA - ${projectName}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
            }
            @media print {
              @page {
                margin: 15mm;
              }
            }
          </style>
        </head>
        <body>
          ${reportRef.current.innerHTML}
          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() { window.close(); }, 500);
            };
          </script>
        </body>
        </html>
      `;
      
      printWindow.document.open();
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      
    } catch (error) {
      console.error('Erro ao imprimir relatório:', error);
    }
  };
  
  return {
    exportToPDF,
    printReport,
    isExporting
  };
};

export default useReportExport;
