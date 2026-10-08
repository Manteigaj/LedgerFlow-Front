import { useState, type FormEvent } from 'react'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import api from '../services/api'

type TransactionType = 'income' | 'expense'
type Transaction = {
  id?: number | string
  description?: string | null
  title?: string | null
  name?: string | null
  amount?: number | string | null
  transaction_type?: TransactionType | null
  type?: TransactionType | null
  category?: string | null
  date?: string | null
  transaction_date?: string | null
  created_at?: string | null
}

type TransactionEnvelope = {
  data?: TransactionResponse
  transactions?: Transaction[]
  items?: Transaction[]
  results?: Transaction[]
  total?: number
  count?: number
}

type TransactionResponse = Transaction[] | TransactionEnvelope

const pageSize = 10
const currencyFormatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

const transactionEndpoints = ['/transactions', '/movimentacoes', '/transaction']

function getTransactionList(response: TransactionResponse | undefined) {
  const payload = Array.isArray(response)
    ? response
    : response?.data ?? response ?? {}

  if (Array.isArray(payload)) return { transactions: payload, total: null }

  return {
    transactions: payload.transactions ?? payload.items ?? payload.results ?? [],
    total: payload.total ?? payload.count ?? null,
  }
}

function getTransactionType(transaction: Transaction): TransactionType | null {
  const type = transaction.transaction_type ?? transaction.type
  if (type === 'income' || type === 'expense') return type

  const amount = Number(transaction.amount)
  if (amount > 0) return 'income'
  if (amount < 0) return 'expense'
  return null
}

function formatDate(value?: string | null) {
  if (!value) return '—'
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString('pt-BR')
}

export function ActivityPage() {
  const [page, setPage] = useState(1)
  const [searchInput, setSearchInput] = useState('')
  const [search, setSearch] = useState('')
  const [transactionType, setTransactionType] = useState<TransactionType | ''>('')
  const [sort, setSort] = useState<'asc' | 'desc'>('desc')
  const { data, isPending, isFetching, error, refetch } = useQuery({
    queryKey: ['transactions', { page, pageSize, search, transactionType, sort }],
    queryFn: async ({ signal }) => {
      let lastError: unknown

      for (const endpoint of transactionEndpoints) {
        try {
          const { data: response } = await api.get<TransactionResponse>(endpoint, {
            params: {
              page,
              limit: pageSize,
              search: search || undefined,
              transaction_type: transactionType || undefined,
              sort,
            },
            signal,
          })

          return getTransactionList(response)
        } catch (error) {
          lastError = error

          if (!axios.isAxiosError(error) || error.response?.status !== 404) {
            throw error
          }
        }
      }

      throw lastError
    },
    placeholderData: keepPreviousData,
  })
  const transactions = data?.transactions ?? []
  const total = data?.total ?? null
  const errorMessage = axios.isAxiosError(error) && error.response?.status === 401
    ? 'Sua sessão expirou. Entre novamente para consultar as movimentações.'
    : 'Não foi possível carregar as movimentações. Verifique a conexão e tente novamente.'

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setPage(1)
    setSearch(searchInput.trim())
  }

  const hasNextPage = total === null
    ? transactions.length === pageSize
    : page * pageSize < total

  return (
    <section aria-labelledby="activity-title">
      <p className="mb-2 text-sm font-semibold text-black">ATIVIDADE</p>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 id="activity-title" className="text-3xl font-bold tracking-[-1px] sm:text-4xl">Movimentações</h1>
          <p className="mt-2 text-base text-[#64778a]">Consulte e filtre as transações da sua conta.</p>
        </div>
        {total !== null && <p className="text-sm text-[#64778a]">{total} movimentações</p>}
      </div>

      <form className="mt-8 grid gap-3 border-y border-[#dce5eb] py-5 sm:grid-cols-[minmax(200px,1fr)_190px_150px_auto]" onSubmit={handleSearch}>
        <label className="sr-only" htmlFor="transaction-search">Buscar movimentações</label>
        <input
          className="h-11 rounded-md border border-[#cbd5e2] bg-white px-3 text-sm text-[#1c3048] outline-none placeholder:text-[#8292a9] focus:border-ledger-green focus:ring-2 focus:ring-ledger-green/20"
          id="transaction-search"
          type="search"
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          placeholder="Buscar descrição ou categoria"
        />
        <label className="sr-only" htmlFor="transaction-type">Tipo de movimentação</label>
        <select
          className="h-11 rounded-md border border-[#cbd5e2] bg-white px-3 text-sm text-[#1c3048] outline-none focus:border-ledger-green focus:ring-2 focus:ring-ledger-green/20"
          id="transaction-type"
          value={transactionType}
          onChange={(event) => {
            setPage(1)
            setTransactionType(event.target.value as TransactionType | '')
          }}
        >
          <option value="">Todos os tipos</option>
          <option value="income">Entradas</option>
          <option value="expense">Saídas</option>
        </select>
        <label className="sr-only" htmlFor="transaction-sort">Ordenação por data</label>
        <select
          className="h-11 rounded-md border border-[#cbd5e2] bg-white px-3 text-sm text-[#1c3048] outline-none focus:border-ledger-green focus:ring-2 focus:ring-ledger-green/20"
          id="transaction-sort"
          value={sort}
          onChange={(event) => setSort(event.target.value as 'asc' | 'desc')}
        >
          <option value="desc">Mais recentes</option>
          <option value="asc">Mais antigas</option>
        </select>
        <button className="h-11 rounded-md border border-transparent bg-ledger-action px-5 text-sm font-semibold text-white transition-colors hover:bg-ledger-action-hover focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ledger-green" type="submit">
          Buscar
        </button>
      </form>

      {error ? (
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-[#dce5eb] py-8" role="alert">
          <p className="text-sm text-[#64778a]">{errorMessage}</p>
          <button className="h-10 rounded-md border border-[#cbd5e2] px-4 text-sm font-semibold text-[#465d7b] hover:border-black" type="button" onClick={() => void refetch()}>
            Tentar novamente
          </button>
        </div>
      ) : isPending ? (
        <p className="mt-8 py-10 text-center text-sm text-[#64778a]" role="status">Carregando movimentações...</p>
      ) : transactions.length === 0 ? (
        <div className="mt-8 flex min-h-52 flex-col items-center justify-center border-y border-dashed border-[#cbd7df] px-5 py-10 text-center">
          <h2 className="text-base font-semibold">Nenhuma movimentação encontrada</h2>
          <p className="mt-1 max-w-md text-sm leading-6 text-[#64778a]">Tente alterar os filtros ou volte mais tarde.</p>
        </div>
      ) : (
        <>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-170 border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[#dce5eb] text-xs uppercase text-[#64778a]">
                  <th className="px-3 py-3 font-semibold">Descrição</th>
                  <th className="px-3 py-3 font-semibold">Categoria</th>
                  <th className="px-3 py-3 font-semibold">Tipo</th>
                  <th className="px-3 py-3 font-semibold">Data</th>
                  <th className="px-3 py-3 text-right font-semibold">Valor</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => {
                  const type = getTransactionType(transaction)
                  const amount = Number(transaction.amount)
                  const description = transaction.description ?? transaction.title ?? transaction.name ?? 'Movimentação'
                  const date = transaction.date ?? transaction.transaction_date ?? transaction.created_at

                  return (
                    <tr className="border-b border-[#dce5eb] last:border-0" key={transaction.id ?? `${description}-${index}`}>
                      <td className="px-3 py-4 font-medium">{description}</td>
                      <td className="px-3 py-4 text-[#64778a]">{transaction.category || '—'}</td>
                      <td className="px-3 py-4">
                        {type ? (
                          <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${type === 'income' ? 'bg-[#168f70] text-white' : 'bg-[#fff0e8] text-[#a34423]'}`}>
                            {type === 'income' ? 'Entrada' : 'Saída'}
                          </span>
                        ) : '—'}
                      </td>
                      <td className="px-3 py-4 text-[#64778a]">{formatDate(date)}</td>
                      <td className={`px-3 py-4 text-right font-semibold ${type === 'income' ? 'text-black' : ''}`}>
                        {Number.isFinite(amount) ? `${type === 'income' ? '+' : type === 'expense' ? '-' : ''}${currencyFormatter.format(Math.abs(amount))}` : '—'}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-[#dce5eb] pt-4">
            <button className="h-10 rounded-md border border-[#cbd5e2] px-4 text-sm font-semibold text-[#465d7b] transition-colors hover:border-black disabled:cursor-not-allowed disabled:opacity-50" type="button" disabled={page === 1 || isFetching} onClick={() => setPage((current) => current - 1)}>
              Anterior
            </button>
            <span className="text-sm text-[#64778a]">Página {page}</span>
            <button className="h-10 rounded-md border border-[#cbd5e2] px-4 text-sm font-semibold text-[#465d7b] transition-colors hover:border-black disabled:cursor-not-allowed disabled:opacity-50" type="button" disabled={!hasNextPage || isFetching} onClick={() => setPage((current) => current + 1)}>
              Próxima
            </button>
          </div>
        </>
      )}
    </section>
  )
}