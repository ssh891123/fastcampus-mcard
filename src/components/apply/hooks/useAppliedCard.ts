import { useQuery, UseQueryOptions } from 'react-query'
import { getAppliedCard } from '@remote/apply'
import { ApplyValues } from '@models/apply'

function useAppliedCard({
  userId,
  cardId,
  option,
}: {
  userId: string
  cardId: string
  option: Pick<
    UseQueryOptions<ApplyValues | null>,
    'onSuccess' | 'onError' | 'suspense'
  >
}) {
  return useQuery(
    ['applied', userId, cardId],
    () => getAppliedCard({ userId, cardId }),
    option,
  )
}

export default useAppliedCard
