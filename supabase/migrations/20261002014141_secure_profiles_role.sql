-- Prevent users from updating their own 'role' to escalate privileges
CREATE OR REPLACE FUNCTION check_role_update()
RETURNS TRIGGER AS $$
BEGIN
    -- If the role is being changed
    IF NEW.role IS DISTINCT FROM OLD.role THEN
        -- Allow if invoked via service_role or superadmin
        IF auth.role() = 'authenticated' THEN
            IF NOT EXISTS (
                SELECT 1 FROM public.profiles 
                WHERE id = auth.uid() AND role = 'superadmin'
            ) THEN
                RAISE EXCEPTION 'Not authorized to change role. Privilege escalation detected.';
            END IF;
        END IF;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS ensure_role_not_updated ON public.profiles;

CREATE TRIGGER ensure_role_not_updated
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION check_role_update();
