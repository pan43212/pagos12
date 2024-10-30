import React, { useState, useEffect } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

interface Payment {
  date: string;
  amount: number;
  days: number;
}

const GestionPagos: React.FC = () => {
  const [selectedDates, setSelectedDates] = useState<Date | Date[] | undefined>(undefined)
  const [dailyRate, setDailyRate] = useState<number>(120)
  const [daysWorked, setDaysWorked] = useState<number>(0)
  const [totalEarned, setTotalEarned] = useState<number>(0)
  const [paymentHistory, setPaymentHistory] = useState<Payment[]>([])

  useEffect(() => {
    setTotalEarned(dailyRate * daysWorked)
  }, [dailyRate, daysWorked])

  const handleDateSelect = (dates: Date | Date[] | undefined) => {
    setSelectedDates(dates)
    if (Array.isArray(dates)) {
      setDaysWorked(dates.length)
    } else {
      setDaysWorked(0)
    }
  }

  const handleAddPayment = () => {
    if (totalEarned > 0) {
      const newPayment: Payment = {
        date: new Date().toLocaleDateString(),
        amount: totalEarned,
        days: daysWorked
      }
      setPaymentHistory(prev => [...prev, newPayment])
      setSelectedDates([])
      setDaysWorked(0)
      setTotalEarned(0)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 p-8">
      <h1 className="text-3xl font-bold text-purple-700 mb-8 text-center">Gestión de Pagos de Niñera</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Calendario de Trabajo</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="multiple"
              selected={selectedDates}
              onSelect={handleDateSelect}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Calculadora de Pagos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label htmlFor="dailyRate" className="block text-sm font-medium text-gray-700 mb-1">
                  Tarifa por día ($)
                </label>
                <Input
                  id="dailyRate"
                  type="number"
                  value={dailyRate}
                  onChange={(e) => setDailyRate(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label htmlFor="daysWorked" className="block text-sm font-medium text-gray-700 mb-1">
                  Días trabajados
                </label>
                <Input
                  id="daysWorked"
                  type="number"
                  value={daysWorked}
                  onChange={(e) => setDaysWorked(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <p className="text-lg font-semibold">Total ganado: ${totalEarned.toFixed(2)}</p>
              </div>
              <Button onClick={handleAddPayment} className="w-full bg-green-600 hover:bg-green-700">
                Registrar Pago
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Historial de Pagos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha</TableHead>
                <TableHead>Días</TableHead>
                <TableHead>Monto ($)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paymentHistory.map((payment, index) => (
                <TableRow key={index}>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>{payment.days}</TableCell>
                  <TableCell>${payment.amount.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default GestionPagos

// Renderizar el componente en el DOM
ReactDOM.render(<GestionPagos />, document.getElementById('root'))