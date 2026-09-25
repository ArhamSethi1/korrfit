CREATE OR REPLACE FUNCTION public.reorder_offers(_ids uuid[])
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _total integer;
  _matched integer;
  _distinct integer;
  _id uuid;
  _position integer := 0;
BEGIN
  SELECT count(*) INTO _total FROM public.offers;
  SELECT count(*), count(DISTINCT id)
    INTO _matched, _distinct
    FROM public.offers
    WHERE id = ANY(_ids);

  IF coalesce(array_length(_ids, 1), 0) <> _total
     OR _matched <> _total
     OR _distinct <> _total THEN
    RAISE EXCEPTION 'Offer order must contain every offer exactly once';
  END IF;

  UPDATE public.offers SET sort_order = -sort_order - 1;

  FOREACH _id IN ARRAY _ids LOOP
    UPDATE public.offers SET sort_order = _position WHERE id = _id;
    _position := _position + 1;
  END LOOP;
END;
$$;

REVOKE ALL ON FUNCTION public.reorder_offers(uuid[]) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.reorder_offers(uuid[]) FROM anon;
REVOKE ALL ON FUNCTION public.reorder_offers(uuid[]) FROM authenticated;
GRANT EXECUTE ON FUNCTION public.reorder_offers(uuid[]) TO service_role;